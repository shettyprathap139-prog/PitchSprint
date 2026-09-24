import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { extractText } from "unpdf";
import mammoth from "mammoth";
import pptxgen from "pptxgenjs";
import { pptxToPdf } from "@s8fy/pptx-converter";

import {
  PresentationData,
  PresentationSlide,
  SlideLayout,
} from "@/app/lib/presentation/layouts";

import { getPresentationTheme } from "@/app/lib/presentation/themes";
import { renderPresentation } from "@/app/lib/presentation/renderer";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function getEnhancementInstruction(enhancement: string) {
  switch (enhancement) {
    case "original":
      return `
Use ONLY the information provided by the user.
Do not add outside facts.
Do not invent statistics, claims, examples, or research.
`;

    case "research":
      return `
Use the user's content as the foundation.
Improve it and add useful supporting information where appropriate.
Keep added information concise.
Do not overload slides with research.
`;

    case "improve":
    default:
      return `
Improve and expand the user's content when useful.
Clarify unclear points.
Add reasonable context and explanations.
Do not invent specific statistics or factual claims that are not supported.
`;
  }
}

function cleanJsonText(text: string) {
  let cleaned = text.trim();

  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/i, "")
      .trim();
  }

  return cleaned;
}

function normalizeSlides(slides: PresentationSlide[]): PresentationSlide[] {
  const allowedLayouts: SlideLayout[] = [
    "title",
    "content",
    "two-column",
    "stats",
    "process",
    "comparison",
    "feature-grid",
    "highlight",
    "conclusion",
  ];

  return slides.map((slide, index) => {
   const requestedLayout = String(slide.layout);

let layout: SlideLayout = allowedLayouts.includes(
  requestedLayout as SlideLayout
)
  ? (requestedLayout as SlideLayout)
  : "content";

const slideTitle = String(slide.title || "").toLowerCase();

const slideText = Array.isArray(slide.items)
  ? slide.items
      .map((item: any) =>
        `${item?.title || ""} ${item?.text || ""}`
      )
      .join(" ")
      .toLowerCase()
  : "";

const combinedText = `${slideTitle} ${slideText}`;
if (
  combinedText.includes(" vs ") ||
  combinedText.includes(" versus ") ||
  combinedText.includes("comparison") ||
  combinedText.includes("compare") ||
  combinedText.includes("feasible") && combinedText.includes("optimal") ||
  combinedText.includes("advantages") && combinedText.includes("limitations") ||
  combinedText.includes("pros") && combinedText.includes("cons")
) {
  layout = "comparison";
}

if (
  combinedText.includes("algorithm") ||
  combinedText.includes("step-by-step") ||
  combinedText.includes("step by step") ||
  combinedText.includes("workflow") ||
  combinedText.includes("procedure") ||
  combinedText.includes("process") ||
  combinedText.includes("implementation") ||
  combinedText.includes("methodology")
)
 {
  layout = "process";
}
console.log(
  `Slide ${index + 1}: "${slide.title}" → layout: ${layout}`
);

    return {
      title: String(slide.title || `Slide ${index + 1}`).slice(0, 80),
      subtitle: slide.subtitle
        ? String(slide.subtitle).slice(0, 140)
        : undefined,
      layout,
      items: Array.isArray(slide.items)
        ? slide.items.slice(0, 3).map((item) => ({
            title: String(item.title || "").slice(0, 70),
            text: String(item.text || "").slice(0, 180),
            value: item.value
              ? String(item.value).slice(0, 40)
              : undefined,
          }))
        : [],
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing." },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const files = formData.getAll("files") as File[];
    const presentationType =
      String(formData.get("presentationType") || "Custom");

    const customPrompt =
      String(formData.get("customPrompt") || "").trim();

    const themeId =
      String(formData.get("theme") || "modern-dark");

    const enhancement =
      String(formData.get("enhancement") || "improve");

    if (!files.length) {
      return NextResponse.json(
        { error: "No files were uploaded." },
        { status: 400 }
      );
    }

    const theme = getPresentationTheme(themeId);

    let extractedContent = "";

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name.toLowerCase();

      try {
        if (fileName.endsWith(".txt")) {
          extractedContent += `\n\n--- ${file.name} ---\n\n`;
          extractedContent += buffer.toString("utf8");
        }

        else if (fileName.endsWith(".docx")) {
          const result = await mammoth.extractRawText({
            buffer,
          });

          extractedContent += `\n\n--- ${file.name} ---\n\n`;
          extractedContent += result.value;
        }

        else if (fileName.endsWith(".pdf")) {
          const result = await extractText(new Uint8Array(buffer));

          extractedContent += `\n\n--- ${file.name} ---\n\n`;
          extractedContent += result.text.join("\n");
        }

        else if (
  fileName.endsWith(".jpg") ||
  fileName.endsWith(".jpeg") ||
  fileName.endsWith(".png")
) {
  const base64 = buffer.toString("base64");

  const mimeType = fileName.endsWith(".png")
    ? "image/png"
    : "image/jpeg";

  console.log("Starting Groq Vision request for:", file.name);

  try {
    const visionResponse = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",

      messages: [
        {
          role: "system",
          content:
            "Extract the important text and information from the image. Focus on handwritten notes, printed text, diagrams, charts, and headings. Return concise plain text only.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Read this image and extract its useful presentation content.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64}`,
              },
            },
          ],
        },
      ],

      max_completion_tokens: 250,
      reasoning_effort: "none",
    });

    const visionText =
      visionResponse.choices[0]?.message?.content || "";

    console.log("Groq Vision request completed.");

    extractedContent += `\n\n--- ${file.name} ---\n\n`;
    extractedContent += visionText;
  } catch (visionError: any) {
    console.error(
      "Groq Vision error for",
      file.name,
      ":",
      visionError?.message || visionError
    );

    throw new Error(
      `Image processing failed for ${file.name}: ${
        visionError?.message || "Unknown Vision error"
      }`
    );
  }
}
      } catch (fileError) {
        console.error(
          `Failed to process ${file.name}:`,
          fileError
        );
      }
    }

    if (!extractedContent.trim()) {
      extractedContent =
        "The uploaded material contains very little readable text. Create a useful presentation based on the requested presentation type and instructions.";
    }

    const enhancementInstruction =
      getEnhancementInstruction(enhancement);

    const systemPrompt = `
You are PitchSprint, an AI presentation generator.

Create a professional, visually balanced presentation from the user's uploaded content.

PRESENTATION TYPE:
${presentationType}

CONTENT ENHANCEMENT:
${enhancementInstruction}

USER'S OPTIONAL INSTRUCTIONS:
${customPrompt || "No additional instructions."}

CONTENT QUALITY RULES:

1. Understand the source content before creating slides.
2. Preserve the user's main ideas and terminology.
3. Organize information into a logical presentation flow.
4. Expand weak or incomplete content when the selected enhancement mode allows it.
5. Do not make slides unnecessarily sparse.
6. Each slide should contain enough useful information to feel complete.
7. Prefer 2–3 strong items per slide rather than many weak items.
8. Each item should normally contain 1–2 concise sentences.
9. Keep sentences easy to read on a projector.
10. Avoid large paragraphs.
11. Use examples when they genuinely help explain a concept.
12. For technical topics, explain important concepts in simple but accurate language.
13. When the source contains steps, processes, definitions, comparisons, or examples, preserve them and organize them into appropriate slides.
14. Do not repeat the same information across multiple slides.
15. Do not add unrelated information just to fill empty space.
16. Do not invent specific statistics, numbers, studies, or claims.
17. When using "Use only my content", do not add outside information.
18. When using "Improve & Expand", add useful explanations and reasonable context without inventing unsupported facts.
19. When using "Research + Expand", add concise supporting knowledge where useful and avoid overwhelming the presentation.
20. The final presentation should feel like a human-created academic or professional presentation, not an AI-generated text dump.

SLIDE STRUCTURE:

Create between 4 and 6 slides.

Create exactly 4 slides in the slides array.

The 4 slides should provide a complete but concise presentation.

Use this structure when it fits the content:

1. Core concept or background
2. Key concepts, principles, or definitions
3. Working, process, algorithm, or implementation
4. Applications, benefits, limitations, or final takeaway

Adapt the structure when the source content requires it, but ALWAYS return exactly 4 slides.

Do not create fewer than 4 slides.

The presentation title must be short and specific, preferably 2–6 words.
Avoid unnecessarily long titles such as "The Complete Guide to..." or "Principles, Definitions, and...".

The presentation should normally follow a useful structure such as:

Do not force every presentation to use this exact structure. Adapt it to the source content.

LAYOUT RULES:

Choose the visual layout based on the actual information on each slide.

Do NOT use the same layout repeatedly when another layout would communicate the information better.

Allowed layouts:

title
content
two-column
stats
process
comparison
feature-grid
highlight
conclusion

Use layouts intelligently:

- "content" → general explanations, concepts, or balanced information
- "two-column" → two related concepts, categories, or side-by-side information
- "process" → algorithms, workflows, procedures, or step-by-step sequences
- "comparison" → advantages vs limitations, old vs new, method A vs method B, or clear contrasts
- "feature-grid" → multiple distinct features, components, characteristics, or applications
- "highlight" → one especially important idea, definition, principle, or takeaway
- "stats" → important numerical values, measurements, percentages, scores, or metrics
- "conclusion" → final summary and key takeaway

VISUAL VARIETY:

1. Prefer different layouts across consecutive slides when appropriate.
2. Do not use "content" for every slide.
3. Do not use "feature-grid" unless the slide genuinely contains multiple distinct items.
4. Do not use "stats" unless meaningful numerical information exists.
5. Use "process" for algorithms and step-by-step explanations whenever appropriate.
6. Use "comparison" when two ideas can be meaningfully contrasted.
7. Use "highlight" when one concept deserves visual emphasis.
8. Use "two-column" when information naturally divides into two groups.
9. The final slide must use "conclusion".
10. Choose the layout for communication value, not simply to create visual variety.

IMPORTANT OUTPUT RULES:

1. Return ONLY one valid JSON object.
2. NEVER return a JSON array by itself.
3. Do NOT use markdown.
4. Do NOT use code fences.
5. The JSON must start with { and end with }.
6. The slides array MUST contain exactly 4 slides.
7. Maximum 3 items per slide.
8. Keep slide titles short and meaningful, preferably under 50 characters.
9. Keep subtitles concise.
10. Keep item titles short.
11. Keep item text concise but informative.
12. Item text may contain 1–2 short sentences when needed.
13. Avoid long paragraphs.
14. Make the presentation easy to read on a projector.
15. Maintain a clear logical flow from slide to slide.
16. Avoid unnecessary repetition.
17. The first slide must represent the actual subject, not a generic "Introduction", "The Problem", or "Overview" slide.
18. The final slide should provide a meaningful takeaway or conclusion.
19. Do not create a title slide inside the slides array; PitchSprint will create the cover separately.
20. Do not add fields outside the required JSON structure.

Required JSON structure:

{
  "title": "Presentation title",
  "subtitle": "Short presentation subtitle",
  "slides": [
    {
      "id": "slide-1",
      "title": "Slide title",
      "subtitle": "Optional subtitle",
      "layout": "content",
      "items": [
        {
          "title": "Item title",
          "text": "Concise but informative explanation.",
          "value": "Optional value"
        }
      ]
    }
  ]
}

Do not put comments inside the JSON.
Do not add any fields outside this structure.
`;

    const userPrompt = `
Create the presentation now.

SOURCE CONTENT:

${extractedContent.slice(0, 18000)}
`;

    const response = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],

      response_format: {
        type: "json_object",
      },

      max_completion_tokens: 400,

      reasoning_effort: "none",

      temperature: 0.3,
    });

    const rawContent =
      response.choices[0]?.message?.content || "";

    if (!rawContent.trim()) {
      throw new Error(
        "AI returned an empty response."
      );
    }

    console.log(
      "AI response received:",
      rawContent.slice(0, 500)
    );

    let aiPresentation: PresentationData;

    try {
      const cleaned = cleanJsonText(rawContent);

      aiPresentation =
        JSON.parse(cleaned) as PresentationData;
    } catch (jsonError) {
      console.error(
        "AI JSON parsing failed:",
        jsonError
      );

      console.error(
        "Raw AI response:",
        rawContent
      );

      throw new Error(
        "AI returned invalid presentation JSON."
      );
    }

    if (
      !aiPresentation ||
      !Array.isArray(aiPresentation.slides)
    ) {
      throw new Error(
        "AI response did not contain a valid slides array."
      );
    }

    let slides = normalizeSlides(
      aiPresentation.slides
    );

    const genericTitles = [
      "the problem",
      "problem",
      "our problem",
      "the solution",
      "solution",
      "our solution",
      "introduction",
      "overview",
      "key differentiators",
      "conclusion",
    ];

    const aiTitle =
      String(aiPresentation.title || "").trim();

    const titleLooksGeneric =
      !aiTitle ||
      genericTitles.includes(
        aiTitle.toLowerCase()
      );

    const presentationTitle =
      titleLooksGeneric
        ? `${presentationType} Presentation`
        : aiTitle;

    const presentationSubtitle =
      String(
        aiPresentation.subtitle ||
          `A professional ${presentationType.toLowerCase()} presentation`
      ).trim();

    const coverSlide: PresentationSlide = {
      title: presentationTitle,
      subtitle: presentationSubtitle,
      layout: "title",
      items: [],
    };

    slides = slides.filter(
      (slide) => slide.layout !== "title"
    );

    slides = [
      coverSlide,
      ...slides,
    ];

    if (slides.length > 6) {
      slides = slides.slice(0, 6);
    }

    if (slides.length > 1) {
      slides[slides.length - 1] = {
        ...slides[slides.length - 1],
        layout: "conclusion",
      };
    }

    const presentation: PresentationData = {
      title: presentationTitle,
      subtitle: presentationSubtitle,
      slides,
    };

    const pptx = new pptxgen();

    pptx.layout = "LAYOUT_WIDE";
    pptx.author = "PitchSprint";
    pptx.subject = presentationType;
    pptx.title = presentationTitle;
    pptx.company = "PitchSprint";

    renderPresentation(
      presentation,
      {
        pptx,
        theme,
      }
    );

    const output = (await pptx.write({
  outputType: "nodebuffer",
})) as Buffer;

const pdfResult = await pptxToPdf(output);

return NextResponse.json({
  presentation,
  pptx: Buffer.from(output).toString("base64"),
  pdf: Buffer.from(pdfResult.data).toString("base64"),
}); 
  } catch (error: any) {
    console.error(
      "Generation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to generate presentation.",
      },
      { status: 500 }
    );
  }
}