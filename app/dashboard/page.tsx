"use client";

import { useRouter } from "next/navigation";
import { Nav } from "../components";

const presentations = [
  {
    title: "Aware — Investor Pitch",
    type: "Investor Pitch",
    slides: 7,
    date: "Today",
  },
  {
    title: "Smart Campus Project",
    type: "Project",
    slides: 9,
    date: "Yesterday",
  },
  {
    title: "Research Presentation",
    type: "Research",
    slides: 8,
    date: "Aug 30",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main>
      <Nav />

      <div className="ps-dashboard">
        <aside className="ps-dashboard-sidebar">
          <div className="ps-dashboard-user">
            <div className="ps-avatar">P</div>

            <div>
              <strong>My Workspace</strong>
              <span>Personal account</span>
            </div>
          </div>

          <div className="ps-sidebar-section">
            <span>WORKSPACE</span>

            <button className="active">
              <span>▦</span>
              Presentations
            </button>

            <button>
              <span>☆</span>
              Favorites
            </button>
          </div>

          <div className="ps-sidebar-section">
            <span>ACCOUNT</span>

            <button>
              <span>⚙</span>
              Settings
            </button>

            <button>
              <span>?</span>
              Help
            </button>
          </div>

          <div className="ps-sidebar-bottom">
            <div className="ps-plan-card">
              <span className="ps-mini-label">
                CURRENT PLAN
              </span>

              <strong>Free</strong>

              <p>
                2 of 3 presentations used this month.
              </p>

              <button className="ps-btn primary">
                Upgrade
              </button>
            </div>
          </div>
        </aside>

        <section className="ps-dashboard-main">
          <div className="ps-dashboard-header">
            <div>
              <div className="ps-kicker">WORKSPACE</div>

              <h1 className="ps-h2">
                Your presentations
              </h1>

              <p className="ps-sub">
                Create, edit, and manage your presentations.
              </p>
            </div>

            <button
              className="ps-btn primary"
              onClick={() => router.push("/upload")}
            >
              + New Presentation
            </button>
          </div>

          <div className="ps-dashboard-stats">
            <div className="ps-dashboard-stat">
              <span>Total presentations</span>
              <strong>12</strong>
            </div>

            <div className="ps-dashboard-stat">
              <span>This month</span>
              <strong>3</strong>
            </div>

            <div className="ps-dashboard-stat">
              <span>Saved styles</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="ps-presentations-heading">
            <h2>Recent presentations</h2>

            <button className="ps-btn ghost">
              View all →
            </button>
          </div>

          <div className="ps-presentation-grid">
            {presentations.map((presentation, index) => (
              <div
                className="ps-presentation-card"
                key={presentation.title}
              >
                <div className="ps-presentation-preview">
                  <div className="ps-presentation-brand">
                    <span className="ps-logo">P</span>
                    <span>PITCHSPRINT</span>
                  </div>

                  <div className="ps-presentation-preview-title">
                    {presentation.title}
                  </div>

                  <div className="ps-presentation-accent" />

                  <div className="ps-presentation-blocks">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="ps-presentation-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="ps-presentation-info">
                  <div>
                    <h3>{presentation.title}</h3>

                    <p>
                      {presentation.type} ·{" "}
                      {presentation.slides} slides
                    </p>
                  </div>

                  <span className="ps-presentation-date">
                    {presentation.date}
                  </span>
                </div>

                <div className="ps-presentation-actions">
                  <button
                    className="ps-btn secondary"
                    onClick={() => router.push("/preview")}
                  >
                    Open
                  </button>

                  <button className="ps-icon-button">
                    ⋮
                  </button>
                </div>
              </div>
            ))}

            <button
              className="ps-new-presentation-card"
              onClick={() => router.push("/upload")}
            >
              <div className="ps-new-icon">+</div>

              <strong>Create a presentation</strong>

              <span>
                Upload your content and let AI do the rest.
              </span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}