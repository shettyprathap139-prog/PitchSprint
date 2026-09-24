"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "../components";
import { usePitch } from "../context/PitchContext";
import { SlideLayout } from "../lib/presentation/layouts";

export default function PreviewPage() {
  const router = useRouter();

  const {
    generatedPresentation,
    setGeneratedPresentation,
    theme,
  } = usePitch();

  const [selectedSlide, setSelectedSlide] = useState(0);

  if (!generatedPresentation) {
    return (
      <main>
        <Nav />

        <div className="ps-page">
          <div className="ps-download">
            <div className="ps-kicker">
              NO PRESENTATION
            </div>

            <h1 className="ps-h2">
              No presentation to preview.
            </h1>

            <p className="ps-sub">
              Generate a presentation first.
            </p>

            <button
              className="ps-btn primary"
              onClick={() => router.push("/upload")}
            >
              Create presentation →
            </button>
          </div>
        </div>
      </main>
    );
  }

  const slides = generatedPresentation.slides || [];
  const currentSlide = slides[selectedSlide];

  const updateSlideTitle = (value: string) => {
    setGeneratedPresentation((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        slides: previous.slides.map((slide, index) =>
          index === selectedSlide
            ? {
                ...slide,
                title: value,
              }
            : slide
        ),
      };
    });
  };

  const updateItemText = (
    itemIndex: number,
    value: string
  ) => {
    setGeneratedPresentation((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        slides: previous.slides.map((slide, index) => {
          if (index !== selectedSlide) {
            return slide;
          }

          return {
            ...slide,
            items: (slide.items || []).map(
              (item, itemIndexValue) =>
                itemIndexValue === itemIndex
                  ? {
                      ...item,
                      text: value,
                    }
                  : item
            ),
          };
        }),
      };
    });
  };

  const updateSlideLayout = (value: string) => {
    setGeneratedPresentation((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        slides: previous.slides.map((slide, index) =>
          index === selectedSlide
            ? {
                ...slide,
                layout: value as SlideLayout,
              }
            : slide
        ),
      };
    });
  };

  const items = currentSlide?.items || [];
  const layout = currentSlide?.layout || "content";

  const renderSlideContent = () => {
    if (!currentSlide) return null;

    /*
     * TITLE
     */
    if (layout === "title") {
      return (
        <div className="ps-preview-title-layout">
          <div className="ps-slide-kicker">
            TITLE
          </div>

          <h2>{currentSlide.title}</h2>

          <div className="ps-slide-accent" />

          {items[0]?.text && (
            <p>{items[0].text}</p>
          )}
        </div>
      );
    }

    /*
     * PROCESS
     */
    if (layout === "process") {
      return (
        <div className="ps-preview-process">
          {items.slice(0, 4).map((item, index) => (
            <div
              className="ps-preview-process-step"
              key={index}
            >
              <div className="ps-process-number">
                {index + 1}
              </div>

              <div className="ps-process-body">
                <strong>
                  {item.title ||
                    `Step ${index + 1}`}
                </strong>

                {item.text && (
                  <p>{item.text}</p>
                )}
              </div>

              {index < Math.min(items.length, 4) - 1 && (
                <div className="ps-process-arrow">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    /*
     * TWO COLUMN
     */
    if (layout === "two-column") {
      return (
        <div className="ps-preview-two-column">
          {items.slice(0, 2).map((item, index) => (
            <div
              className="ps-preview-column"
              key={index}
            >
              <strong>
                {item.title ||
                  `Section ${index + 1}`}
              </strong>

              {item.text && (
                <p>{item.text}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    /*
     * COMPARISON
     */
    if (layout === "comparison") {
      return (
        <div className="ps-preview-comparison">
          {items.slice(0, 2).map((item, index) => (
            <div
              className="ps-preview-comparison-card"
              key={index}
            >
              <span>
                {index === 0
                  ? "OPTION A"
                  : "OPTION B"}
              </span>

              <strong>
                {item.title ||
                  `Option ${index + 1}`}
              </strong>

              {item.text && (
                <p>{item.text}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    /*
     * FEATURE GRID
     */
    if (layout === "feature-grid") {
      return (
        <div className="ps-preview-feature-grid">
          {items.slice(0, 4).map((item, index) => (
            <div
              className="ps-preview-feature-card"
              key={index}
            >
              <div className="ps-feature-number">
                0{index + 1}
              </div>

              <strong>
                {item.title ||
                  `Feature ${index + 1}`}
              </strong>

              {item.text && (
                <p>{item.text}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    /*
     * STATS
     */
    if (layout === "stats") {
      return (
        <div className="ps-preview-stats">
          {items.slice(0, 4).map((item, index) => (
            <div
              className="ps-preview-stat"
              key={index}
            >
              <strong>
                {item.title}
              </strong>

              <p>{item.text}</p>
            </div>
          ))}
        </div>
      );
    }

    /*
     * HIGHLIGHT
     */
    if (layout === "highlight") {
      const firstItem = items[0];

      return (
        <div className="ps-preview-highlight">
          {firstItem?.title && (
            <strong>
              {firstItem.title}
            </strong>
          )}

          {firstItem?.text && (
            <p>{firstItem.text}</p>
          )}
        </div>
      );
    }

    /*
     * CONCLUSION
     */
    if (layout === "conclusion") {
      return (
        <div className="ps-preview-conclusion">
          <div className="ps-conclusion-label">
            KEY TAKEAWAY
          </div>

          {items.slice(0, 3).map((item, index) => (
            <div
              className="ps-conclusion-item"
              key={index}
            >
              <span>✓</span>

              <div>
                {item.title && (
                  <strong>
                    {item.title}
                  </strong>
                )}

                {item.text && (
                  <p>{item.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    /*
     * DEFAULT CONTENT
     */
    return (
      <div className="ps-preview-content">
        {items.slice(0, 4).map((item, index) => (
          <div
            className="ps-preview-item"
            key={index}
          >
            {item.title && (
              <strong>{item.title}</strong>
            )}

            {item.text && (
              <p>{item.text}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main>
      <Nav />

      <div className="ps-editor">

        {/* HEADER */}
        <div className="ps-editor-top">
          <div>
            <div className="ps-kicker">
              PRESENTATION EDITOR
            </div>

            <h1>Preview & edit</h1>

            <p>
              Review and make quick changes before
              downloading.
            </p>
          </div>

          <div className="ps-editor-actions">
            <button
              className="ps-btn primary"
              onClick={() =>
                router.push("/download")
              }
            >
              Download →
            </button>
          </div>
        </div>

        {/* EDITOR */}
        <div className="ps-editor-layout">

          {/* LEFT */}
          <aside className="ps-thumbnails">

            <div className="ps-thumbnail-header">
              <strong>Slides</strong>

              <span>
                {slides.length}
              </span>
            </div>

            <div className="ps-thumbnail-list">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  className={`ps-thumbnail ${
                    index === selectedSlide
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedSlide(index)
                  }
                >
                  <div className="ps-thumbnail-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div className="ps-thumbnail-preview">

                    <span className="thumb-label">
                      PITCHSPRINT
                    </span>

                    <strong>
                      {slide.title ||
                        "Untitled Slide"}
                    </strong>

                    <span className="thumb-line" />

                    <span className="thumb-block" />

                    <span className="thumb-block short" />

                  </div>
                </button>
              ))}
            </div>

          </aside>

          {/* CENTER */}
          <section className="ps-editor-main">

            {/* TOOLBAR */}
            <div className="ps-editor-toolbar">

              <div className="ps-toolbar-left">

                <span>
                  Slide{" "}
                  {String(
                    selectedSlide + 1
                  ).padStart(2, "0")}
                </span>

                <span className="ps-toolbar-divider" />

                <span>
                  {layout}
                </span>

              </div>

            </div>

            {/* SLIDE */}
            <div className="ps-slide-stage">

              <div className="ps-slide-preview">

                {/* BRAND */}
                <div className="ps-slide-brand">

                  <span className="ps-logo">
                    P
                  </span>

                  <span>
                    PITCHSPRINT
                  </span>

                </div>

                {/* NUMBER */}
                <div className="ps-slide-number">
                  {String(
                    selectedSlide + 1
                  ).padStart(2, "0")}
                </div>

                {/* CONTENT */}
                <div
                  className={`ps-slide-center ps-layout-${layout}`}
                >

                  {layout !== "title" && (
                    <div className="ps-slide-kicker">
                      {layout.toUpperCase()}
                    </div>
                  )}

                  {layout !== "title" && (
                    <h2>
                      {currentSlide?.title ||
                        "Untitled Slide"}
                    </h2>
                  )}

                  {renderSlideContent()}

                </div>

                {/* DECORATION */}
                <div className="ps-slide-decoration" />

                {/* FOOTER */}
                <div className="ps-slide-footer">
                  Generated with PitchSprint
                </div>

              </div>
            </div>

            {/* BOTTOM */}
            <div className="ps-editor-bottom">

              <span>
                <strong>
                  {slides.length} slides
                </strong>

                {" · "}

                {theme === "modern-dark"
                  ? "Modern Dark"
                  : theme}
              </span>

              <span>
                All slides use the same visual theme
              </span>

            </div>

          </section>

          {/* RIGHT */}
          <aside className="ps-properties">

            <div className="ps-properties-header">
              <strong>
                Slide settings
              </strong>
            </div>

            {currentSlide && (
              <>

                {/* TITLE */}
                <div className="ps-property">

                  <label>
                    Slide title
                  </label>

                  <input
                    value={
                      currentSlide.title || ""
                    }
                    onChange={(event) =>
                      updateSlideTitle(
                        event.target.value
                      )
                    }
                  />

                </div>

                {/* LAYOUT */}
                <div className="ps-property">

                  <label>
                    Layout
                  </label>

                  <select
                    value={layout}
                    onChange={(event) =>
                      updateSlideLayout(
                        event.target.value
                      )
                    }
                  >
                    <option value="title">
                      Title
                    </option>

                    <option value="content">
                      Content
                    </option>

                    <option value="two-column">
                      Two Column
                    </option>

                    <option value="stats">
                      Stats
                    </option>

                    <option value="process">
                      Process
                    </option>

                    <option value="comparison">
                      Comparison
                    </option>

                    <option value="feature-grid">
                      Feature Grid
                    </option>

                    <option value="highlight">
                      Highlight
                    </option>

                    <option value="conclusion">
                      Conclusion
                    </option>
                  </select>

                  <span className="ps-property-hint">
                    Choose how this slide is
                    structured.
                  </span>

                </div>

                {/* CONTENT */}
                <div className="ps-property">

                  <label>
                    Slide content
                  </label>

                  {currentSlide.items?.map(
                    (item, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "12px",
                        }}
                      >

                        {item.title && (
                          <strong
                            style={{
                              display: "block",
                              marginBottom: "6px",
                            }}
                          >
                            {item.title}
                          </strong>
                        )}

                        <textarea
                          value={
                            item.text || ""
                          }
                          onChange={(event) =>
                            updateItemText(
                              index,
                              event.target.value
                            )
                          }
                          rows={4}
                        />

                      </div>
                    )
                  )}

                </div>

              </>
            )}

          </aside>

        </div>
      </div>
    </main>
  );
}