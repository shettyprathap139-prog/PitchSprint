import Link from "next/link";
import { Nav } from "./components";

function ProcessCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="ps-process-card">
      <div className="ps-process-number">{number}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />

      {/* =========================================
          HERO
      ========================================= */}

      <main>
        <section className="ps-hero">
          <div className="ps-hero-copy">
            <div className="ps-kicker">
              AI PRESENTATION BUILDER
            </div>

            <h1>
              Turn your ideas
              <br />
              into <span>impact.</span>
            </h1>

            <p className="ps-sub">
              Upload your notes, photos, PDFs or documents.
              PitchSprint turns them into a polished
              presentation in seconds.
            </p>

            <div className="ps-hero-actions">
              <Link
                href="/upload"
                className="ps-btn primary"
              >
                Create My Presentation →
              </Link>

              <a
                href="#how"
                className="ps-btn ghost"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Presentation visual */}

          <div className="ps-hero-visual">
            <div className="ps-slide-stack">

              <div className="ps-slide-card one">
                <div className="ps-slide-label">
                  PITCHSPRINT
                </div>

                <div className="ps-slide-title">
                  Ideas → Impact
                </div>

                <div className="ps-slide-line" />

                <div className="ps-slide-small">
                  Turn raw notes into a clear,
                  presentation-ready story.
                </div>
              </div>

              <div className="ps-slide-card two">
                <div className="ps-slide-label">
                  AI POWERED
                </div>

                <div className="ps-slide-title">
                  From Notes
                  <br />
                  to Impact
                </div>

                <div className="ps-slide-line" />
              </div>

              <div className="ps-slide-card three">
                <div className="ps-slide-label">
                  PITCHSPRINT
                </div>

                <div className="ps-slide-title">
                  From Notes
                  <br />
                  to Impact
                </div>

                <div className="ps-slide-line" />

                <div className="ps-slide-small">
                  AI-powered. Fast.
                  Presentation-ready.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================
            FEATURES
        ========================================= */}

        <section
          className="ps-section"
          id="features"
        >
          <div className="section-title">
            <div className="ps-kicker">
              WHY PITCHSPRINT
            </div>

            <h2 className="ps-h2">
              Everything you need
              <br />
              to build faster.
            </h2>

            <p className="ps-sub">
              Go from scattered material to a
              presentation you can actually present.
            </p>
          </div>

          <div className="ps-grid three">

            <div className="ps-card">
              <div className="ps-card-icon">
                ↑
              </div>

              <h3>
                Upload anything
              </h3>

              <p>
                Photos, PDFs, notes and documents.
                PitchSprint understands your source
                material and turns it into slides.
              </p>
            </div>

            <div className="ps-card">
              <div className="ps-card-icon">
                ✦
              </div>

              <h3>
                AI understands it
              </h3>

              <p>
                AI extracts, summarizes and organizes
                your content into a logical presentation
                story.
              </p>
            </div>

            <div className="ps-card">
              <div className="ps-card-icon">
                ◇
              </div>

              <h3>
                Choose your style
              </h3>

              <p>
                Select a presentation theme and keep
                the same visual identity across the
                entire deck.
              </p>
            </div>

          </div>
        </section>

        {/* =========================================
            HOW IT WORKS
        ========================================= */}

        <section
          className="ps-section"
          id="how"
        >
          <div className="section-title">
            <div className="ps-kicker">
              HOW IT WORKS
            </div>

            <h2 className="ps-h2">
              From raw material
              <br />
              to presentation.
            </h2>

            <p className="ps-sub">
              Four simple steps. No manual slide
              building required.
            </p>
          </div>

          <div className="ps-process">

            <ProcessCard
              number="01"
              title="Upload"
              text="Drop your photos, notes, PDFs or documents into PitchSprint."
            />

            <ProcessCard
              number="02"
              title="Customize"
              text="Choose your presentation type and the visual theme for your deck."
            />

            <ProcessCard
              number="03"
              title="Guide AI"
              text="Optionally tell AI what you want added, changed or expanded."
            />

            <ProcessCard
              number="04"
              title="Generate"
              text="PitchSprint creates a structured, presentation-ready PowerPoint."
            />

          </div>
        </section>

        {/* =========================================
            PRICING
        ========================================= */}

        <section
          className="ps-section"
          id="pricing"
        >
          <div className="section-title">
            <div className="ps-kicker">
              SIMPLE PRICING
            </div>

            <h2 className="ps-h2">
              Start free.
              <br />
              Upgrade when you need more.
            </h2>
          </div>

          <div className="ps-pricing-card">

            <div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "22px",
                }}
              >
                PitchSprint Student
              </h3>

              <p
                className="ps-sub"
                style={{
                  fontSize: "14px",
                }}
              >
                Create presentations faster with
                AI-powered content generation and
                professional themes.
              </p>
            </div>

            <div
              style={{
                textAlign: "right",
              }}
            >
              <div className="ps-price">
                ₹99
                <span>/month</span>
              </div>

              <Link
                href="/upload"
                className="ps-btn primary"
                style={{
                  marginTop: "14px",
                }}
              >
                Get Started
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================
            FINAL CTA
        ========================================= */}

        <section className="ps-section">
          <div
            className="ps-card"
            style={{
              textAlign: "center",
              padding: "60px 30px",
            }}
          >
            <div className="ps-kicker">
              READY?
            </div>

            <h2
              className="ps-h2"
              style={{
                marginTop: "18px",
              }}
            >
              Your next presentation
              <br />
              starts here.
            </h2>

            <p
              className="ps-sub"
              style={{
                margin: "15px auto 25px",
              }}
            >
              Upload what you already have.
              Let PitchSprint handle the rest.
            </p>

            <Link
              href="/upload"
              className="ps-btn primary"
            >
              Create My Presentation →
            </Link>
          </div>
        </section>
      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="ps-footer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div>
            © 2026 PitchSprint
          </div>

          <div>
            Turn ideas into impact.
          </div>
        </div>
      </footer>
    </>
  );
}