"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Steps } from "../components";
import { usePitch } from "../context/PitchContext";

const generationSteps = [
  "Reading your files",
  "Understanding your content",
  "Building the presentation story",
  "Applying your visual theme",
  "Preparing your PowerPoint",
];

export default function GeneratePage() {
  const router = useRouter();

  const {
  files,
  presentationType,
  customPrompt,
  theme,
  enhancement,
  setGeneratedPresentation,
  setGeneratedPdf,
} = usePitch();

  const [currentStep, setCurrentStep] =
    useState<number>(0);

  const [error, setError] =
    useState<string>("");

  const [started, setStarted] =
    useState<boolean>(false);

  useEffect(() => {
    if (started) {
      return;
    }

    setStarted(true);

    generatePresentation();
  }, [started]);

  async function generatePresentation() {
    if (files.length === 0) {
      setError(
        "No files were uploaded. Please go back and upload your content."
      );

      return;
    }

    try {
      /* =========================================
         GENERATION PROGRESS
      ========================================= */

      setCurrentStep(0);

      await wait(700);

      setCurrentStep(1);

      await wait(700);

      setCurrentStep(2);

      /* =========================================
         FORM DATA
      ========================================= */

      const formData = new FormData();

      files.forEach((file: File) => {
        formData.append("files", file);
      });

      formData.append(
        "presentationType",
        presentationType
      );

      formData.append(
        "customPrompt",
        customPrompt
      );

      formData.append(
        "theme",
        theme
      );

      formData.append(
        "enhancement",
        enhancement
      );

      /* =========================================
         SEND TO BACKEND
      ========================================= */

      const response = await fetch(
        "/api/generate",
        { 
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        let message =
          "Failed to generate presentation.";

        try {
          const data =
            await response.json();

          if (data?.error) {
            message = data.error;
          }
        } catch {
          // Keep default error message.
        }

        throw new Error(message);
      }

      setCurrentStep(3);

      await wait(700);

      const result = await response.json();

setGeneratedPresentation(result.presentation);
setGeneratedPdf(result.pdf);

sessionStorage.setItem(
  "pitchsprint-pptx",
  result.pptx
);
sessionStorage.setItem(
  "pitchsprint-pdf",
  result.pdf
);

      setCurrentStep(4);

      await wait(700);

      

      /*
       * Give the browser a moment to complete
       * the download before moving forward.
       */

      await wait(500);

      router.push("/download");
    } catch (err) {
      console.error(
        "Generation failed:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating your presentation."
      );
    }
  }

  return (
    <>
      <Steps active={4} />

      <main className="ps-page">
        <div className="ps-generation">
          <div className="ps-generation-card">

            {error ? (
              <>
                <div
                  className="ps-upload-icon"
                  style={{
                    background:
                      "rgba(239, 68, 68, 0.12)",
                    color:
                      "#f87171",
                  }}
                >
                  !
                </div>

                <h1>
                  Something went wrong
                </h1>

                <p>
                  {error}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "center",
                    gap: "10px",
                    marginTop: "25px",
                  }}
                >
                  <button
                    type="button"
                    className="ps-btn ghost"
                    onClick={() =>
                      router.push(
                        "/instructions"
                      )
                    }
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    className="ps-btn primary"
                    onClick={() =>
                      window.location.reload()
                    }
                  >
                    Try Again
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="ps-loader" />

                <h1>
                  Creating your presentation
                </h1>

                <p>
                  PitchSprint is turning your
                  content into a presentation.
                </p>

                {/* =================================
                    PROGRESS
                ================================= */}

                <div
                  style={{
                    marginTop: "35px",
                    textAlign: "left",
                  }}
                >
                  {generationSteps.map(
                    (
                      step: string,
                      index: number
                    ) => {
                      const completed =
                        index <
                        currentStep;

                      const active =
                        index ===
                        currentStep;

                      return (
                        <div
                          key={step}
                          style={{
                            display: "flex",
                            alignItems:
                              "center",
                            gap: "12px",
                            marginBottom:
                              "14px",
                            color:
                              completed ||
                              active
                                ? "var(--text)"
                                : "var(--muted-2)",
                            fontSize:
                              "13px",
                          }}
                        >
                          <div
                            style={{
                              width: "24px",
                              height: "24px",
                              flexShrink: 0,
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              borderRadius:
                                "50%",
                              background:
                                completed
                                  ? "var(--blue)"
                                  : active
                                  ? "var(--blue-soft)"
                                  : "#183653",
                              color:
                                completed ||
                                active
                                  ? "white"
                                  : "var(--muted-2)",
                              fontSize:
                                "11px",
                              fontWeight:
                                700,
                            }}
                          >
                            {completed
                              ? "✓"
                              : index + 1}
                          </div>

                          <span>
                            {step}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* =================================
                    SETTINGS SUMMARY
                ================================= */}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:
                      "center",
                    gap: "8px",
                    marginTop: "25px",
                  }}
                >
                  <span
                    style={{
                      padding:
                        "6px 10px",
                      border:
                        "1px solid var(--border)",
                      borderRadius:
                        "999px",
                      color:
                        "var(--muted)",
                      fontSize:
                        "11px",
                    }}
                  >
                    {presentationType}
                  </span>

                  <span
                    style={{
                      padding:
                        "6px 10px",
                      border:
                        "1px solid var(--border)",
                      borderRadius:
                        "999px",
                      color:
                        "var(--muted)",
                      fontSize:
                        "11px",
                    }}
                  >
                    {getThemeLabel(
                      theme
                    )}
                  </span>

                  <span
                    style={{
                      padding:
                        "6px 10px",
                      border:
                        "1px solid var(--border)",
                      borderRadius:
                        "999px",
                      color:
                        "var(--muted)",
                      fontSize:
                        "11px",
                    }}
                  >
                    {getEnhancementLabel(
                      enhancement
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================
   HELPERS
========================================= */

function wait(
  milliseconds: number
): Promise<void> {
  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        milliseconds
      )
  );
}

function getThemeLabel(
  value: string
): string {
  if (value === "clean-light") {
    return "Clean Light";
  }

  if (value === "minimal") {
    return "Minimal";
  }

  if (value === "bold") {
    return "Bold";
  }

  return "Modern Dark";
}

function getEnhancementLabel(
  value: string
): string {
  if (value === "original") {
    return "Original content";
  }

  if (value === "research") {
    return "Research + expand";
  }

  return "Improve + expand";
}