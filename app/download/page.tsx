"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Nav } from "../components";
import { usePitch } from "../context/PitchContext";

export default function DownloadPage() {
  const router = useRouter();
  const { generatedPdf } = usePitch();
  const [pdfData, setPdfData] =
  useState<string | null>(generatedPdf);

useEffect(() => {
  if (generatedPdf) {
    setPdfData(generatedPdf);
    return;
  }

  const storedPdf =
    sessionStorage.getItem("pitchsprint-pdf");

  if (storedPdf) {
    setPdfData(storedPdf);
  }
}, [generatedPdf]);

  const downloadPresentation = () => {
    const base64 = sessionStorage.getItem(
      "pitchsprint-pptx"
    );

    if (!base64) {
      alert("Presentation file is not available.");
      return;
    }

    const byteCharacters = atob(base64);

    const byteNumbers = new Array(
      byteCharacters.length
    );

    for (
      let i = 0;
      i < byteCharacters.length;
      i++
    ) {
      byteNumbers[i] =
        byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(
      byteNumbers
    );

    const blob = new Blob(
      [byteArray],
      {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "PitchSprint-Presentation.pptx";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  };
  const downloadPdf = () => {
  if (!pdfData) {
    alert("PDF file is not available.");
    return;
  }

  const byteCharacters = atob(pdfData);
  const byteNumbers = new Array(
    byteCharacters.length
  );

  for (
    let i = 0;
    i < byteCharacters.length;
    i++
  ) {
    byteNumbers[i] =
      byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(
    byteNumbers
  );

  const blob = new Blob(
    [byteArray],
    {
      type: "application/pdf",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    "PitchSprint-Presentation.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #06152b 0%, #071a33 55%, #0a2342 100%)",
        color: "#f8fafc",
      }}
    >
      <Nav />

      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding:
            "70px 24px 90px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 22px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "rgba(59,130,246,0.15)",
              border:
                "1px solid rgba(59,130,246,0.45)",
              color: "#60a5fa",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            ✓
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "7px 14px",
              borderRadius: "999px",
              background:
                "rgba(59,130,246,0.10)",
              border:
                "1px solid rgba(59,130,246,0.35)",
              color: "#60a5fa",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "1.4px",
              marginBottom: "18px",
            }}
          >
            PRESENTATION READY
          </div>

          <h1
            style={{
              margin: 0,
              fontSize:
                "clamp(36px, 5vw, 58px)",
              lineHeight: 1.05,
              fontWeight: 750,
              letterSpacing: "-2px",
            }}
          >
            Your presentation
            <br />
            is ready.
          </h1>

          <p
            style={{
              maxWidth: "620px",
              margin:
                "20px auto 0",
              color: "#9fb2ca",
              fontSize: "17px",
              lineHeight: 1.7,
            }}
          >
            Your content has been transformed
            into a presentation. Review it,
            make quick edits, or download the
            finished PowerPoint.
          </p>
        </div>

        {/* Main card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.15fr) minmax(300px, 0.85fr)",
            gap: "0",
            border:
              "1px solid rgba(148,163,184,0.18)",
            borderRadius: "24px",
            overflow: "hidden",
            background:
              "rgba(13,39,71,0.72)",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.30)",
          }}
        >
          {/* Presentation preview */}
          <div
            style={{
              padding: "34px",
              background:
                "rgba(7,26,51,0.72)",
              borderRight:
                "1px solid rgba(148,163,184,0.14)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "18px",
                color: "#7f96b2",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
              }}
            >
              <span>PREVIEW</span>
              <span>POWERPOINT</span>
            </div>

            {/* Fake slide preview */}
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                borderRadius: "14px",
                overflow: "hidden",
                background:
                  "#071a33",
                border:
                  "1px solid rgba(96,165,250,0.28)",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "24px",
                  right: "24px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  color: "#9fb2ca",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                }}
              >
                <span>PITCHSPRINT</span>
                <span>01</span>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "9%",
                  top: "32%",
                  right: "12%",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "3px",
                    background: "#3b82f6",
                    marginBottom: "18px",
                    borderRadius: "4px",
                  }}
                />

                <div
                  style={{
                    fontSize:
                      "clamp(18px, 3vw, 30px)",
                    fontWeight: 750,
                    lineHeight: 1.1,
                    letterSpacing:
                      "-0.8px",
                  }}
                >
                  Your Presentation
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    width: "65%",
                    height: "7px",
                    borderRadius: "8px",
                    background:
                      "rgba(148,163,184,0.20)",
                  }}
                />

                <div
                  style={{
                    marginTop: "8px",
                    width: "48%",
                    height: "7px",
                    borderRadius: "8px",
                    background:
                      "rgba(148,163,184,0.12)",
                  }}
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  width: "110px",
                  height: "110px",
                  right: "-25px",
                  bottom: "-35px",
                  borderRadius: "50%",
                  background:
                    "rgba(59,130,246,0.12)",
                  border:
                    "1px solid rgba(59,130,246,0.30)",
                }}
              />
            </div>

            <div
              style={{
                marginTop: "16px",
                color: "#7f96b2",
                fontSize: "12px",
              }}
            >
              A preview of your generated
              presentation
            </div>
          </div>

          {/* File information */}
          <div
            style={{
              padding: "34px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "rgba(59,130,246,0.14)",
                border:
                  "1px solid rgba(59,130,246,0.25)",
                color: "#60a5fa",
                fontSize: "13px",
                fontWeight: 800,
                marginBottom: "24px",
              }}
            >
              PPTX
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "23px",
                lineHeight: 1.3,
                fontWeight: 700,
              }}
            >
              PitchSprint
              <br />
              Presentation
            </h2>

            <p
              style={{
                margin:
                  "12px 0 26px",
                color: "#8fa6c0",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              PowerPoint presentation
              <br />
              Ready to edit
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                padding:
                  "12px 14px",
                borderRadius: "10px",
                background:
                  "rgba(255,255,255,0.035)",
                border:
                  "1px solid rgba(148,163,184,0.10)",
                marginBottom: "24px",
                color: "#9fb2ca",
                fontSize: "12px",
              }}
            >
              <span
                style={{
                  color: "#4ade80",
                  fontSize: "16px",
                }}
              >
                ●
              </span>

              Generated successfully
            </div>

            <button
  onClick={
    downloadPresentation
  }
  style={{
    flex: 1,
    border: "none",
                borderRadius: "12px",
                padding:
                  "15px 20px",
                background:
                  "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow:
                  "0 10px 30px rgba(37,99,235,0.25)",
              }}
            >
              ↓ Download PPTX
            </button>
            <button
  onClick={downloadPdf}
  style={{
    flex: 1,
    border: "1px solid rgba(96,165,250,0.30)",
    borderRadius: "12px",
    padding: "15px 20px",
    background: "rgba(59,130,246,0.08)",
    color: "#b8c9dc",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  <div
  style={{
    display: "flex",
    gap: "12px",
    width: "100%",
  }}
>
  
</div>
  ↓ Download PDF
</button>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "22px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() =>
              router.push("/preview")
            }
            style={{
              padding:
                "13px 22px",
              borderRadius: "11px",
              border:
                "1px solid rgba(96,165,250,0.30)",
              background:
                "rgba(59,130,246,0.08)",
              color: "#b8c9dc",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Preview & edit →
          </button>

          <button
            onClick={() =>
              router.push("/choose")
            }
            style={{
              padding:
                "13px 22px",
              borderRadius: "11px",
              border:
                "1px solid rgba(148,163,184,0.16)",
              background:
                "rgba(255,255,255,0.03)",
              color: "#8fa6c0",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ← Edit settings
          </button>
        </div>

        {/* Footer note */}
        <div
          style={{
            textAlign: "center",
            marginTop: "38px",
            color: "#657d99",
            fontSize: "12px",
          }}
        >
          You can continue editing the
          downloaded presentation in PowerPoint,
          Google Slides, or another compatible
          editor.
        </div>
      </div>
    </main>
  );
}