"use client";

import {
  ChangeEvent,
  DragEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Steps, PageHeader } from "../components";
import { usePitch } from "../context/PitchContext";

export default function UploadPage() {
  const router = useRouter();

  const {
    files,
    setFiles,
  } = usePitch();

  const [dragging, setDragging] =
    useState<boolean>(false);

  function addFiles(
    newFiles: File[]
  ) {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    const validFiles = newFiles.filter(
      (file: File) =>
        allowedTypes.includes(file.type) ||
        /\.(jpg|jpeg|png|pdf|docx|txt)$/i.test(
          file.name
        )
    );

    setFiles([
      ...files,
      ...validFiles,
    ]);
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles =
      Array.from(
        event.target.files || []
      );

    addFiles(selectedFiles);

    event.target.value = "";
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    setDragging(false);

    const droppedFiles =
      Array.from(
        event.dataTransfer.files
      );

    addFiles(droppedFiles);
  }

  function removeFile(
    fileIndex: number
  ) {
    setFiles(
      files.filter(
        (
          _file: File,
          index: number
        ) => index !== fileIndex
      )
    );
  }

  function continueToCustomize() {
    if (files.length === 0) {
      return;
    }

    router.push("/choose");
  }

  return (
    <>
      <Steps active={1} />

      <main className="ps-page">
        <PageHeader
          kicker="STEP 1"
          title="What do you have?"
          text="Upload your notes, documents, photos, or existing material. PitchSprint will turn them into a presentation."
        />

        {/* =========================================
            UPLOAD AREA
        ========================================= */}

        <div
          className="ps-upload-box"
          style={{
            borderColor: dragging
              ? "var(--blue)"
              : undefined,

            background: dragging
              ? "rgba(37, 99, 235, 0.10)"
              : undefined,

            transition:
              "border-color 0.2s ease, background 0.2s ease",
          }}
          onDragOver={(
            event: DragEvent<HTMLDivElement>
          ) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => {
            setDragging(false);
          }}
          onDrop={handleDrop}
        >
          <div>
            <div className="ps-upload-icon">
              ↑
            </div>

            <h2>
              Drop your files here
            </h2>

            <p>
              or choose files from your
              computer
            </p>

            <label
              htmlFor="file-upload"
              className="ps-btn primary"
            >
              Choose Files
            </label>

            <input
              id="file-upload"
              type="file"
              className="ps-file-input"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.docx,.txt"
              onChange={handleFileChange}
            />

            <div className="ps-file-types">
              JPG · PNG · PDF · DOCX · TXT
            </div>

            <div
              style={{
                marginTop: "8px",
                color: "var(--muted)",
                fontSize: "12px",
              }}
            >
              ✦ Handwritten notes,
              whiteboards & photos supported
            </div>
          </div>
        </div>

        {/* =========================================
            FILE LIST
        ========================================= */}

        {files.length > 0 && (
          <div
            style={{
              marginTop: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                marginBottom: "12px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "17px",
                }}
              >
                Uploaded files
              </h2>

              <span
                style={{
                  color:
                    "var(--muted)",
                  fontSize: "12px",
                }}
              >
                {files.length}{" "}
                {files.length === 1
                  ? "file"
                  : "files"}
              </span>
            </div>

            <div className="ps-file-list">
              {files.map(
                (
                  file: File,
                  index: number
                ) => (
                  <div
                    className="ps-file"
                    key={`${file.name}-${index}`}
                  >
                    <div>
                      <div className="ps-file-name">
                        {file.name}
                      </div>

                      <div
                        style={{
                          marginTop: "4px",
                          color:
                            "var(--muted-2)",
                          fontSize: "11px",
                        }}
                      >
                        {formatFileSize(
                          file.size
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="ps-file-remove"
                      onClick={() =>
                        removeFile(index)
                      }
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* =========================================
            ACTIONS
        ========================================= */}

        <div className="ps-page-actions">
          <Link
            href="/"
            className="ps-btn ghost"
          >
            ← Back
          </Link>

          <button
            type="button"
            className="ps-btn primary"
            onClick={
              continueToCustomize
            }
            disabled={
              files.length === 0
            }
            style={{
              opacity:
                files.length === 0
                  ? 0.45
                  : 1,

              cursor:
                files.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Continue →
          </button>
        </div>
      </main>
    </>
  );
}

/* =========================================
   FILE SIZE
========================================= */

function formatFileSize(
  bytes: number
): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.floor(
    Math.log(bytes) /
      Math.log(1024)
  );

  const size =
    bytes /
    Math.pow(1024, index);

  return `${size.toFixed(
    index === 0 ? 0 : 1
  )} ${units[index]}`;
}