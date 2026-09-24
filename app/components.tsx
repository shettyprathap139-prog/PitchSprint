"use client";

import Link from "next/link";

export function Nav() {
  return (
    <nav className="ps-nav">
      <Link
        href="/"
        className="ps-brand"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <span className="ps-logo">P</span>

        <span>PitchSprint</span>
      </Link>

      <div className="ps-navlinks">
        <Link href="/">Home</Link>

        <Link href="/#features">
          Features
        </Link>

        <Link href="/#how">
          How it works
        </Link>

        <Link href="/#pricing">
          Pricing
        </Link>
      </div>

      <div className="ps-actions">
        <button className="ps-btn ghost">
          Sign in
        </button>

        <Link
          href="/upload"
          className="ps-btn primary"
          style={{
            textDecoration: "none",
          }}
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export function Steps({
  active,
}: {
  active: number;
}) {
  const labels = [
    "Upload",
    "Customize",
    "AI Instructions",
    "Generate",
    "Preview",
  ];

  return (
    <div className="ps-stepbar">
      {labels.map((label, index) => {
        const stepNumber = index + 1;

        return (
          <div
            className={`ps-step ${
              active === stepNumber
                ? "active"
                : ""
            }`}
            key={label}
          >
            <span className="num">
              {stepNumber}
            </span>

            {label}
          </div>
        );
      })}
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  text,
}: {
  kicker?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-title">
      {kicker && (
        <div className="ps-kicker">
          {kicker}
        </div>
      )}

      <h1
        className="ps-h2"
        style={{
          marginTop: kicker ? 15 : 0,
        }}
      >
        {title}
      </h1>

      {text && (
        <p className="ps-sub">
          {text}
        </p>
      )}
    </div>
  );
}