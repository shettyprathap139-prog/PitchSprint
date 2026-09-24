"use client";

import { useRouter } from "next/navigation";
import { usePitch } from "../context/PitchContext";
import { Steps, PageHeader } from "../components";

const presentationTypes = [
  {
    id: "Academic",
    title: "Academic",
    text: "For assignments, seminars, lectures and college presentations.",
  },
  {
    id: "Investor Pitch",
    title: "Investor Pitch",
    text: "For startups, competitions, investors and business ideas.",
  },
  {
    id: "Project",
    title: "Project",
    text: "For technical, software, engineering and college projects.",
  },
  {
    id: "Research",
    title: "Research",
    text: "For research papers, findings, studies and technical topics.",
  },
  {
    id: "Creative",
    title: "Creative",
    text: "For storytelling, portfolios, campaigns and creative ideas.",
  },
  {
    id: "Custom",
    title: "Custom",
    text: "Let AI decide the best structure for your content.",
  },
];

const themes = [
  {
    id: "modern-dark",
    title: "Modern Dark",
    text: "Premium dark navy with electric blue accents.",
    previewClass: "theme-preview-dark",
  },
  {
    id: "clean-light",
    title: "Clean Light",
    text: "Bright, clean and professional presentation style.",
    previewClass: "theme-preview-light",
  },
  {
    id: "minimal",
    title: "Minimal",
    text: "Simple, elegant and distraction-free.",
    previewClass: "theme-preview-minimal",
  },
  {
    id: "bold",
    title: "Bold",
    text: "Strong typography and high-impact visual blocks.",
    previewClass: "theme-preview-bold",
  },
];

const enhancementOptions = [
  {
    id: "original",
    title: "Use only my content",
    text: "Stay strictly within the information I provide.",
  },
  {
    id: "improve",
    title: "Improve & expand",
    text: "Improve the structure and add useful context when the source is sparse.",
  },
  {
    id: "research",
    title: "Research + expand",
    text: "Research useful supporting information and build a stronger presentation.",
  },
];

export default function ChoosePage() {
  const router = useRouter();

  const {
    presentationType,
    setPresentationType,
    theme,
    setTheme,
    enhancement,
    setEnhancement,
    customPrompt,
    setCustomPrompt,
  } = usePitch();

  function continueToInstructions() {
    router.push("/instructions");
  }

  return (
    <>
      <Steps active={2} />

      <main className="ps-page">
        <PageHeader
          kicker="STEP 2"
          title="Customize your presentation"
          text="Choose what you're creating and how you want the final presentation to look."
        />

        {/* =========================================
            PRESENTATION TYPE
        ========================================= */}

        <section className="ps-form-section">
          <h2>What are you creating?</h2>

          <div className="ps-option-grid">
            {presentationTypes.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`ps-option ${
                  presentationType === option.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPresentationType(option.id)
                }
              >
                <div className="ps-option-title">
                  {option.title}
                </div>

                <div className="ps-option-text">
                  {option.text}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* =========================================
            VISUAL THEME
        ========================================= */}

        <section className="ps-form-section">
          <h2>Choose your visual style</h2>

          <p
            style={{
              margin: "0 0 15px",
              color: "var(--muted)",
              fontSize: "13px",
            }}
          >
            This theme will stay consistent across
            your entire presentation.
          </p>

          <div className="ps-option-grid">
            {themes.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`ps-option ${
                  theme === option.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setTheme(option.id)
                }
              >
                <div
                  className={`theme-preview ${option.previewClass}`}
                  style={{
                    height: "95px",
                    borderRadius: "10px",
                    marginBottom: "16px",
                    padding: "13px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "55%",
                      height: "7px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      background:
                        "currentColor",
                      opacity: 0.9,
                    }}
                  />

                  <div
                    style={{
                      width: "75%",
                      height: "5px",
                      borderRadius: "5px",
                      marginBottom: "7px",
                      background:
                        "currentColor",
                      opacity: 0.35,
                    }}
                  />

                  <div
                    style={{
                      width: "45%",
                      height: "5px",
                      borderRadius: "5px",
                      background:
                        "currentColor",
                      opacity: 0.25,
                    }}
                  />

                  <div
                    style={{
                      width: "30%",
                      height: "20px",
                      marginTop: "14px",
                      borderRadius: "5px",
                      background:
                        "currentColor",
                      opacity: 0.5,
                    }}
                  />
                </div>

                <div className="ps-option-title">
                  {option.title}
                </div>

                <div className="ps-option-text">
                  {option.text}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* =========================================
            CONTENT ENHANCEMENT
        ========================================= */}

        <section className="ps-form-section">
          <h2>How should AI handle your content?</h2>

          <div className="ps-option-grid">
            {enhancementOptions.map(
              (option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`ps-option ${
                    enhancement === option.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setEnhancement(option.id)
                  }
                >
                  <div className="ps-option-title">
                    {option.title}
                  </div>

                  <div className="ps-option-text">
                    {option.text}
                  </div>
                </button>
              )
            )}
          </div>
        </section>

        {/* =========================================
            QUICK INSTRUCTIONS
        ========================================= */}

        <section className="ps-form-section">
          <h2>
            Anything else?{" "}
            <span
              style={{
                color: "var(--muted-2)",
                fontWeight: 500,
                fontSize: "13px",
              }}
            >
              Optional
            </span>
          </h2>

          <textarea
            className="ps-textarea"
            value={customPrompt}
            onChange={(event) =>
              setCustomPrompt(
                event.target.value
              )
            }
            placeholder="For example: Make this suitable for a 5-minute hackathon pitch. Add a slide about the business model and keep the slides concise."
          />

          <div
            style={{
              marginTop: "9px",
              color: "var(--muted-2)",
              fontSize: "12px",
            }}
          >
            You can ask AI to add a topic, change the
            focus, adjust the tone, or create a specific
            number of slides.
          </div>
        </section>

        {/* =========================================
            ACTIONS
        ========================================= */}

        <div className="ps-page-actions">
          <button
            type="button"
            className="ps-btn ghost"
            onClick={() =>
              router.push("/upload")
            }
          >
            ← Back
          </button>

          <button
            type="button"
            className="ps-btn primary"
            onClick={
              continueToInstructions
            }
          >
            Continue →
          </button>
        </div>
      </main>
    </>
  );
}