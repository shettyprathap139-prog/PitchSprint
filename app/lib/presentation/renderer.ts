import pptxgen from "pptxgenjs";

import {
  PresentationData,
  PresentationSlide,
  SlideItem,
} from "./layouts";

import { PresentationTheme } from "./themes";

type PptxSlide = ReturnType<pptxgen["addSlide"]>;

type RendererOptions = {
  pptx: pptxgen;
  theme: PresentationTheme;
};

/* =========================================================
   CONSTANTS
========================================================= */

const SW = 13.333;
const SH = 7.5;

const MARGIN_X = 0.7;
const CONTENT_TOP = 1.45;
const CONTENT_BOTTOM = 6.55;

/* =========================================================
   MAIN RENDERER
========================================================= */

export function renderPresentation(
  data: PresentationData,
  options: RendererOptions
) {
  const { pptx, theme } = options;

  data.slides.forEach((slideData, index) => {
    const slide = pptx.addSlide();

    applyBaseTheme(slide, theme);

    switch (slideData.layout) {
      case "title":
        renderTitle(slide, slideData, theme);
        break;

      case "content":
        renderContent(slide, slideData, theme);
        break;

      case "two-column":
        renderTwoColumn(slide, slideData, theme);
        break;

      case "stats":
        renderStats(slide, slideData, theme);
        break;

      case "process":
        renderProcess(slide, slideData, theme);
        break;

      case "comparison":
        renderComparison(slide, slideData, theme);
        break;

      case "feature-grid":
        renderFeatureGrid(slide, slideData, theme);
        break;

      case "highlight":
        renderHighlight(slide, slideData, theme);
        break;

      case "conclusion":
        renderConclusion(slide, slideData, theme);
        break;

      default:
        renderContent(slide, slideData, theme);
    }

    addFooter(slide, theme, index, data.slides.length);
  });

  return pptx;
}

/* =========================================================
   THEME
========================================================= */

function applyBaseTheme(
  slide: PptxSlide,
  theme: PresentationTheme
) {
  slide.background = {
    color: theme.colors.background,
  };
}

/* =========================================================
   HEADER
========================================================= */

function addHeader(
  slide: PptxSlide,
  theme: PresentationTheme,
  title: string,
  eyebrow?: string
) {
  if (eyebrow) {
    slide.addText(eyebrow.toUpperCase(), {
      x: MARGIN_X,
      y: 0.35,
      w: 4,
      h: 0.2,
      fontFace: theme.fonts.body,
      fontSize: 7,
      bold: true,
      color: theme.colors.primary,
      charSpacing: 1.5,
      margin: 0,
    });
  }

  slide.addText(title, {
    x: MARGIN_X,
    y: 0.58,
    w: 9.5,
    h: 0.55,
    fontFace: theme.fonts.heading,
    fontSize: theme.sizes.sectionTitle,
    bold: true,
    color: theme.colors.text,
    margin: 0,
    fit: "shrink",
  });

  slide.addShape(pptxgen.ShapeType.rect, {
    x: MARGIN_X,
    y: 1.18,
    w: 0.75,
    h: 0.045,
    fill: {
      color: theme.colors.primary,
    },
    line: {
      color: theme.colors.primary,
      transparency: 100,
    },
  });

  slide.addText("PITCHSPRINT", {
    x: 10.35,
    y: 0.48,
    w: 2.25,
    h: 0.2,
    fontFace: theme.fonts.body,
    fontSize: 7,
    bold: true,
    color: theme.colors.muted,
    align: "right",
    margin: 0,
    charSpacing: 1.5,
  });
}

/* =========================================================
   FOOTER
========================================================= */

function addFooter(
  slide: PptxSlide,
  theme: PresentationTheme,
  index: number,
  total: number
) {
  slide.addText("PITCHSPRINT", {
    x: 0.7,
    y: 7.02,
    w: 2,
    h: 0.16,
    fontFace: theme.fonts.body,
    fontSize: 6.5,
    bold: true,
    color: theme.colors.muted,
    charSpacing: 1.2,
    margin: 0,
  });

  slide.addText(
    `${String(index + 1).padStart(2, "0")} / ${String(
      total
    ).padStart(2, "0")}`,
    {
      x: 11.1,
      y: 7.02,
      w: 1.5,
      h: 0.16,
      fontFace: theme.fonts.body,
      fontSize: 6.5,
      color: theme.colors.muted,
      align: "right",
      margin: 0,
    }
  );
}

/* =========================================================
   DATA HELPERS
========================================================= */

function getItems(slide: PresentationSlide): SlideItem[] {
  return Array.isArray(slide.items) ? slide.items : [];
}

function itemTitle(item?: SlideItem) {
  return item?.title || item?.label || "";
}

function itemText(item?: SlideItem) {
  return item?.text || "";
}

/* =========================================================
   CARD
========================================================= */

function addCard(
  slide: PptxSlide,
  theme: PresentationTheme,
  x: number,
  y: number,
  w: number,
  h: number,
  accent = false
) {
  slide.addShape(pptxgen.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: theme.style.radius,
    fill: {
      color: theme.colors.surface,
    },
    line: {
      color: accent
        ? theme.colors.primary
        : theme.colors.border,
      width: accent
        ? Math.max(theme.style.borderWidth, 1.2)
        : theme.style.borderWidth,
    },
  });

  if (accent) {
    slide.addShape(pptxgen.ShapeType.rect, {
      x,
      y,
      w: 0.045,
      h,
      fill: {
        color: theme.colors.primary,
      },
      line: {
        color: theme.colors.primary,
        transparency: 100,
      },
    });
  }
}

function addCardTitle(
  slide: PptxSlide,
  theme: PresentationTheme,
  title: string,
  x: number,
  y: number,
  w: number,
  size = 15
) {
  slide.addText(title, {
    x,
    y,
    w,
    h: 0.42,
    fontFace: theme.fonts.heading,
    fontSize: size,
    bold: true,
    color: theme.colors.text,
    margin: 0,
    fit: "shrink",
  });
}

function addCardText(
  slide: PptxSlide,
  theme: PresentationTheme,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  size = 12
) {
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontFace: theme.fonts.body,
    fontSize: size,
    color: theme.colors.muted,
    margin: 0,
    valign: "top",
    fit: "shrink",
    breakLine: false,
  });
}

function addAccentDot(
  slide: PptxSlide,
  theme: PresentationTheme,
  x: number,
  y: number,
  size = 0.3
) {
  slide.addShape(pptxgen.ShapeType.ellipse, {
    x,
    y,
    w: size,
    h: size,
    fill: {
      color: theme.colors.primary,
    },
    line: {
      color: theme.colors.primary,
      transparency: 100,
    },
  });
}

/* =========================================================
   TITLE
========================================================= */

function renderTitle(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  slide.addText("PITCHSPRINT", {
    x: 0.7,
    y: 0.52,
    w: 2.5,
    h: 0.2,
    fontFace: theme.fonts.body,
    fontSize: 8,
    bold: true,
    color: theme.colors.muted,
    charSpacing: 1.8,
    margin: 0,
  });

  slide.addText(slideData.title, {
    x: 0.85,
    y: 2.18,
    w: 8.4,
    h: 1.25,
    fontFace: theme.fonts.heading,
    fontSize: Math.max(theme.sizes.title + 8, 36),
    bold: true,
    color: theme.colors.text,
    margin: 0,
    fit: "shrink",
  });

  slide.addShape(pptxgen.ShapeType.rect, {
    x: 0.85,
    y: 3.62,
    w: 0.75,
    h: 0.06,
    fill: {
      color: theme.colors.primary,
    },
    line: {
      color: theme.colors.primary,
      transparency: 100,
    },
  });

  if (slideData.subtitle) {
    slide.addText(slideData.subtitle, {
      x: 0.85,
      y: 3.98,
      w: 7.8,
      h: 0.75,
      fontFace: theme.fonts.body,
      fontSize: 17,
      color: theme.colors.muted,
      margin: 0,
      fit: "shrink",
    });
  }

  // Premium decorative circle
  slide.addShape(pptxgen.ShapeType.ellipse, {
    x: 9.55,
    y: 4.05,
    w: 3.15,
    h: 3.15,
    fill: {
      color: theme.colors.primarySoft,
      transparency: 35,
    },
    line: {
      color: theme.colors.primary,
      transparency: 65,
      width: 1.2,
    },
  });

  slide.addShape(pptxgen.ShapeType.ellipse, {
    x: 10.15,
    y: 4.65,
    w: 1.95,
    h: 1.95,
    fill: {
      color: theme.colors.primary,
      transparency: 88,
    },
    line: {
      color: theme.colors.primary,
      transparency: 100,
    },
  });
}

/* =========================================================
   CONTENT
========================================================= */

function renderContent(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const items = getItems(slideData).slice(0, 6);

  if (!items.length) return;

  const columns = items.length <= 3 ? items.length : 2;
  const rows = Math.ceil(items.length / columns);

  const gapX = 0.3;
  const gapY = 0.3;

  const availableWidth = 11.9;
  const cardWidth =
    (availableWidth - gapX * (columns - 1)) / columns;

  const cardHeight =
    Math.min(
      2.05,
      (5.05 - gapY * (rows - 1)) / rows
    );

  items.forEach((item, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);

    const x =
      0.7 + col * (cardWidth + gapX);

    const y =
      1.55 + row * (cardHeight + gapY);

    addCard(
      slide,
      theme,
      x,
      y,
      cardWidth,
      cardHeight,
      index === 0
    );

    addAccentDot(
      slide,
      theme,
      x + 0.3,
      y + 0.28,
      0.22
    );

    const title = itemTitle(item);
    const text = itemText(item);

    if (title) {
      addCardTitle(
        slide,
        theme,
        title,
        x + 0.3,
        y + 0.7,
        cardWidth - 0.6
      );
    }

    if (text) {
      addCardText(
        slide,
        theme,
        text,
        x + 0.3,
        y + 1.18,
        cardWidth - 0.6,
        cardHeight - 1.35
      );
    }
  });
}

/* =========================================================
   TWO COLUMN
========================================================= */

function renderTwoColumn(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const items = getItems(slideData).slice(0, 2);

  items.forEach((item, index) => {
    const x = index === 0 ? 0.7 : 6.75;

    addCard(
      slide,
      theme,
      x,
      1.65,
      5.85,
      4.65,
      index === 0
    );

    slide.addText(
      index === 0 ? "01" : "02",
      {
        x: x + 0.35,
        y: 1.98,
        w: 0.65,
        h: 0.3,
        fontFace: theme.fonts.heading,
        fontSize: 12,
        bold: true,
        color: theme.colors.primary,
        margin: 0,
      }
    );

    const title = itemTitle(item);
    const text = itemText(item);

    if (title) {
      addCardTitle(
        slide,
        theme,
        title,
        x + 0.35,
        2.55,
        5.0,
        20
      );
    }

    if (text) {
      addCardText(
        slide,
        theme,
        text,
        x + 0.35,
        3.2,
        5.0,
        2.35,
        13
      );
    }
  });
}

/* =========================================================
   STATS
========================================================= */

function renderStats(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const items = getItems(slideData).slice(0, 3);

  items.forEach((item, index) => {
    const x = 0.7 + index * 4.05;

    addCard(
      slide,
      theme,
      x,
      1.7,
      3.75,
      4.25,
      index === 0
    );

    slide.addText(
      item.value || "—",
      {
        x: x + 0.35,
        y: 2.2,
        w: 3.05,
        h: 0.85,
        fontFace: theme.fonts.heading,
        fontSize: theme.sizes.stat + 4,
        bold: true,
        color: theme.colors.primary,
        margin: 0,
        fit: "shrink",
      }
    );

    const title = itemTitle(item);
    const text = itemText(item);

    if (title) {
      addCardTitle(
        slide,
        theme,
        title,
        x + 0.35,
        3.35,
        3.0,
        16
      );
    }

    if (text) {
      addCardText(
        slide,
        theme,
        text,
        x + 0.35,
        3.95,
        3.0,
        1.25
      );
    }
  });
}

/* =========================================================
   PROCESS
========================================================= */

function renderProcess(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const items = getItems(slideData).slice(0, 5);

  const cardWidth = 2.25;
  const gap = 0.2;

  items.forEach((item, index) => {
    const x = 0.55 + index * (cardWidth + gap);

    addCard(
      slide,
      theme,
      x,
      1.85,
      cardWidth,
      4.35,
      index === 0
    );

    slide.addText(
      String(index + 1).padStart(2, "0"),
      {
        x: x + 0.28,
        y: 2.2,
        w: 0.7,
        h: 0.35,
        fontFace: theme.fonts.heading,
        fontSize: 21,
        bold: true,
        color: theme.colors.primary,
        margin: 0,
      }
    );

    addAccentDot(
      slide,
      theme,
      x + 1.62,
      2.2,
      0.28
    );

    const title = itemTitle(item);
    const text = itemText(item);

    if (title) {
      addCardTitle(
        slide,
        theme,
        title,
        x + 0.28,
        3.0,
        cardWidth - 0.56,
        15
      );
    }

    if (text) {
      addCardText(
        slide,
        theme,
        text,
        x + 0.28,
        3.62,
        cardWidth - 0.56,
        1.8,
        11
      );
    }

    if (index < items.length - 1) {
      slide.addText("→", {
        x: x + cardWidth - 0.03,
        y: 3.25,
        w: gap + 0.1,
        h: 0.4,
        fontFace: theme.fonts.heading,
        fontSize: 17,
        bold: true,
        color: theme.colors.primary,
        align: "center",
        margin: 0,
      });
    }
  });
}

/* =========================================================
   COMPARISON
========================================================= */

function renderComparison(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const items = getItems(slideData).slice(0, 2);

  items.forEach((item, index) => {
    const x = index === 0 ? 0.7 : 6.75;

    addCard(
      slide,
      theme,
      x,
      1.65,
      5.85,
      4.75,
      index === 0
    );

    slide.addText(
      index === 0 ? "OPTION A" : "OPTION B",
      {
        x: x + 0.35,
        y: 1.98,
        w: 2,
        h: 0.25,
        fontFace: theme.fonts.body,
        fontSize: 7,
        bold: true,
        color: theme.colors.primary,
        charSpacing: 1.3,
        margin: 0,
      }
    );

    const title = itemTitle(item);
    const text = itemText(item);

    if (title) {
      addCardTitle(
        slide,
        theme,
        title,
        x + 0.35,
        2.45,
        5.0,
        20
      );
    }

    if (text) {
      addCardText(
        slide,
        theme,
        text,
        x + 0.35,
        3.2,
        5.0,
        2.3,
        13
      );
    }
  });
}

/* =========================================================
   FEATURE GRID
========================================================= */

function renderFeatureGrid(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const items = getItems(slideData).slice(0, 6);

  items.forEach((item, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);

    const x = 0.7 + col * 4.05;
    const y = 1.55 + row * 2.4;

    addCard(
      slide,
      theme,
      x,
      y,
      3.75,
      2.05,
      index === 0
    );

    addAccentDot(
      slide,
      theme,
      x + 0.35,
      y + 0.3,
      0.3
    );

    const title = itemTitle(item);
    const text = itemText(item);

    if (title) {
      addCardTitle(
        slide,
        theme,
        title,
        x + 0.35,
        y + 0.82,
        3.05,
        15
      );
    }

    if (text) {
      addCardText(
        slide,
        theme,
        text,
        x + 0.35,
        y + 1.3,
        3.05,
        0.55,
        10.5
      );
    }
  });
}

/* =========================================================
   HIGHLIGHT
========================================================= */

function renderHighlight(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const item = getItems(slideData)[0];

  addCard(
    slide,
    theme,
    0.95,
    1.7,
    11.45,
    4.6,
    true
  );

  slide.addText("THE BIG IDEA", {
    x: 1.45,
    y: 2.12,
    w: 2.5,
    h: 0.25,
    fontFace: theme.fonts.body,
    fontSize: 7,
    bold: true,
    color: theme.colors.primary,
    charSpacing: 1.5,
    margin: 0,
  });

  if (item?.title) {
    slide.addText(item.title, {
      x: 1.45,
      y: 2.75,
      w: 8.9,
      h: 1.15,
      fontFace: theme.fonts.heading,
      fontSize: theme.sizes.title + 3,
      bold: true,
      color: theme.colors.text,
      margin: 0,
      fit: "shrink",
    });
  }

  if (item?.text) {
    slide.addText(item.text, {
      x: 1.45,
      y: 4.15,
      w: 8.5,
      h: 0.9,
      fontFace: theme.fonts.body,
      fontSize: 14,
      color: theme.colors.muted,
      margin: 0,
      fit: "shrink",
    });
  }

  slide.addShape(pptxgen.ShapeType.ellipse, {
    x: 10.15,
    y: 4.45,
    w: 1.25,
    h: 1.25,
    fill: {
      color: theme.colors.primary,
      transparency: 78,
    },
    line: {
      color: theme.colors.primary,
      transparency: 100,
    },
  });
}

/* =========================================================
   CONCLUSION
========================================================= */

function renderConclusion(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const items = getItems(slideData).slice(0, 4);

  items.forEach((item, index) => {
    const y = 1.65 + index * 1.15;

    addAccentDot(
      slide,
      theme,
      0.8,
      y + 0.08,
      0.32
    );

    if (itemTitle(item)) {
      slide.addText(itemTitle(item), {
        x: 1.35,
        y,
        w: 4.0,
        h: 0.35,
        fontFace: theme.fonts.heading,
        fontSize: 15,
        bold: true,
        color: theme.colors.text,
        margin: 0,
        fit: "shrink",
      });
    }

    if (itemText(item)) {
      slide.addText(itemText(item), {
        x: 5.0,
        y,
        w: 7.0,
        h: 0.55,
        fontFace: theme.fonts.body,
        fontSize: 11.5,
        color: theme.colors.muted,
        margin: 0,
        fit: "shrink",
      });
    }

    if (index < items.length - 1) {
      slide.addShape(pptxgen.ShapeType.line, {
        x: 1.35,
        y: y + 0.65,
        w: 10.5,
        h: 0,
        line: {
          color: theme.colors.border,
          width: 0.6,
          transparency: 35,
        },
      });
    }
  });

  // Final visual accent
  slide.addShape(pptxgen.ShapeType.ellipse, {
    x: 10.85,
    y: 5.55,
    w: 0.75,
    h: 0.75,
    fill: {
      color: theme.colors.primary,
      transparency: 65,
    },
    line: {
      color: theme.colors.primary,
      transparency: 100,
    },
  });
}