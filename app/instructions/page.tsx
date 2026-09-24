"use client";

import { useRouter } from "next/navigation";
import { usePitch } from "../context/PitchContext";
import { Steps, PageHeader } from "../components";

const examples = [
  "Add a slide about the business model.",
  "Make this suitable for a 5-minute pitch.",
  "Research the market and add useful supporting information.",
  "Keep the presentation concise and easy to present.",
];

export default function InstructionsPage() {
  const router = useRouter();

  const {
    customPrompt,
    setCustomPrompt,
    enhancement,
  } = usePitch();

  function continueToGenerate() {
    router.push("/generate");
  }

  return (
    <>
      <Steps active={3} />

      <main className="ps-page">
        <PageHeader
          kicker="STEP 3"
          title="Tell AI what you want"
          text="This step is optional. Give PitchSprint extra direction if you want to change, expand, or focus the presentation."
        />

        {/* =========================================
            INSTRUCTION CARD
        ========================================= */}

        <section
          className="ps-card"
          style={{
            padding: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div className="ps-card-icon">
              ✦
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "19px",
                }}
              >
                AI instructions
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "var(--muted)",
                  fontSize: "12px",
                }}
              >
                Optional
              </p>
            </div>
          </div>

          <textarea
            className="ps-textarea"
            value={customPrompt}
            onChange={(event) =>
              setCustomPrompt(
                event.target.value
              )
            }
            placeholder="Tell AI what you want...

For example:
• Add a slide about the business model
• Make this suitable for a 5-minute pitch
• Research the market and add supporting information
• Focus more on the problem and solution
• Create exactly 7 slides"
            />

          <div
            style={{
              marginTop: "12px",
              color: "var(--muted-2)",
              fontSize: "12px",
            }}
          >
            You don't need to write anything here.
            PitchSprint can create the presentation
            automatically.
          </div>
        </section>

        {/* =========================================
            EXAMPLES
        ========================================= */}

        <section
          className="ps-form-section"
          style={{
            marginTop: "30px",
          }}
        >
          <h2>
            Try an instruction
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            {examples.map(
              (
                example: string,
                index: number
              ) => (
                <button
                  key={index}
                  type="button"
                  className="ps-option"
                  onClick={() =>
                    setCustomPrompt(
                      customPrompt
                        ? `${customPrompt}\n${example}`
                        : example
                    )
                  }
                >
                  <div
                    style={{
                      color:
                        "var(--blue)",
                      fontSize: "18px",
                      marginBottom: "9px",
                    }}
                  >
                    {index + 1}
                  </div>

                  <div
                    className="ps-option-text"
                    style={{
                      marginTop: 0,
                      color:
                        "var(--text)",
                    }}
                  >
                    {example}
                  </div>
                </button>
              )
            )}
          </div>
        </section>

        {/* =========================================
            CURRENT SETTINGS
        ========================================= */}

        <section
          className="ps-form-section"
          style={{
            marginTop: "30px",
          }}
        >
          <h2>
            Your AI settings
          </h2>

          <div
            className="ps-grid two"
          >
            <div className="ps-card">
              <div
                style={{
                  color:
                    "var(--muted-2)",
                  fontSize: "11px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.08em",
                  marginBottom: "8px",
                }}
              >
                Content mode
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                {getEnhancementLabel(
                  enhancement
                )}
              </div>

              <p
                style={{
                  marginTop: "8px",
                }}
              >
                This controls how much AI can
                improve or expand your source
                material.
              </p>
            </div>

            <div className="ps-card">
              <div
                style={{
                  color:
                    "var(--muted-2)",
                  fontSize: "11px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.08em",
                  marginBottom: "8px",
                }}
              >
                Instructions
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                {customPrompt.trim()
                  ? "Custom instructions added"
                  : "Automatic"}
              </div>

              <p
                style={{
                  marginTop: "8px",
                }}
              >
                {customPrompt.trim()
                  ? "AI will use your instructions when building the presentation."
                  : "AI will decide the best presentation structure automatically."}
              </p>
            </div>
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
              router.push("/choose")
            }
          >
            ← Back
          </button>

          <button
            type="button"
            className="ps-btn primary"
            onClick={
              continueToGenerate
            }
          >
            Generate Presentation →
          </button>
        </div>
      </main>
    </>
  );
}

function getEnhancementLabel(
  value: string
): string {
  if (value === "original") {
    return "Use only my content";
  }

  if (value === "research") {
    return "Research + expand";
  }

  return "Improve & expand";
}