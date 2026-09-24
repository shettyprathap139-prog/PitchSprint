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

/* =========================================
   MAIN RENDERER
========================================= */

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

    /*
     * Every slide receives the same footer system.
     */
    addFooter(
      slide,
      theme,
      index,
      data.slides.length
    );
  });

  return pptx;
}

/* =========================================
   GLOBAL THEME
========================================= */

function applyBaseTheme(
  slide: PptxSlide,
  theme: PresentationTheme
) {
  /*
   * THIS IS THE MOST IMPORTANT LINE.
   *
   * Every slide gets the exact same theme
   * background before its layout is rendered.
   */
  slide.background = {
    color: theme.colors.background,
  };
}

/* =========================================
   COMMON HEADER
========================================= */

function addHeader(
  slide: PptxSlide,
  theme: PresentationTheme,
  title: string
) {
  slide.addText(title, {
    x: 0.7,
    y: 0.42,
    w: 8.8,
    h: 0.5,

    fontFace: theme.fonts.heading,
    fontSize: theme.sizes.sectionTitle,
    bold: true,

    color: theme.colors.text,

    margin: 0,
  });

  slide.addShape("rect", {
    x: 0.7,
    y: 1.05,
    w: 0.65,
    h: 0.04,

    fill: {
      color: theme.colors.primary,
    },

    line: {
      color: theme.colors.primary,
      transparency: 100,
    },
  });

  slide.addText("PITCHSPRINT", {
    x: 10.5,
    y: 0.45,
    w: 2.2,
    h: 0.2,

    fontFace: theme.fonts.body,
    fontSize: theme.sizes.small,
    bold: true,

    color: theme.colors.muted,

    align: "right",
    margin: 0,

    charSpacing: 1.2,
  });
}

/* =========================================
   COMMON FOOTER
========================================= */

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
    h: 0.18,

    fontFace: theme.fonts.body,
    fontSize: 7,
    bold: true,

    color: theme.colors.muted,

    margin: 0,
    charSpacing: 1,
  });

  slide.addText(
    `${String(index + 1).padStart(2, "0")} / ${String(
      total
    ).padStart(2, "0")}`,
    {
      x: 11.1,
      y: 7.02,
      w: 1.4,
      h: 0.18,

      fontFace: theme.fonts.body,
      fontSize: 7,

      color: theme.colors.muted,

      align: "right",
      margin: 0,
    }
  );
}

/* =========================================
   GLOBAL CARD
========================================= */

function addCard(
  slide: PptxSlide,
  theme: PresentationTheme,
  x: number,
  y: number,
  w: number,
  h: number
) {
  /*
   * Every card uses the same:
   *
   * background
   * border
   * border width
   *
   * regardless of the slide layout.
   */

  slide.addShape("roundRect", {
    x,
    y,
    w,
    h,

    fill: {
      color: theme.colors.surface,
    },

    line: {
      color: theme.colors.border,
      width: theme.style.borderWidth,
    },
  });
}

/* =========================================
   CARD TITLE
========================================= */

function addCardTitle(
  slide: PptxSlide,
  theme: PresentationTheme,
  title: string,
  x: number,
  y: number,
  w: number
) {
  slide.addText(title, {
    x,
    y,
    w,
    h: 0.4,

    fontFace: theme.fonts.heading,
    fontSize: 15,
    bold: true,

    color: theme.colors.text,

    margin: 0,

    fit: "shrink",
  });
}

/* =========================================
   CARD TEXT
========================================= */

function addCardText(
  slide: PptxSlide,
  theme: PresentationTheme,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number
) {
  slide.addText(text, {
    x,
    y,
    w,
    h,

    fontFace: theme.fonts.body,
    fontSize: theme.sizes.body,

    color: theme.colors.muted,

    margin: 0,

    valign: "top",

    fit: "shrink",
  });
}

/* =========================================
   ITEMS
========================================= */

function getItems(
  slide: PresentationSlide
): SlideItem[] {
  return Array.isArray(slide.items)
    ? slide.items
    : [];
}

/* =========================================
   TITLE SLIDE
========================================= */

function renderTitle(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  slide.addText("PITCHSPRINT", {
    x: 0.7,
    y: 0.55,
    w: 2.4,
    h: 0.25,

    fontFace: theme.fonts.body,
    fontSize: 9,
    bold: true,

    color: theme.colors.muted,

    margin: 0,

    charSpacing: 1.8,
  });

  slide.addText(slideData.title, {
    x: 0.85,
    y: 2.35,
    w: 8.7,
    h: 1.3,

    fontFace: theme.fonts.heading,
    fontSize: theme.sizes.title + 8,
    bold: true,

    color: theme.colors.text,

    margin: 0,

    fit: "shrink",
  });

  slide.addShape("rect", {
    x: 0.85,
    y: 3.8,
    w: 0.75,
    h: 0.05,

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
      y: 4.08,
      w: 7.5,
      h: 0.75,

      fontFace: theme.fonts.body,
      fontSize: theme.sizes.body + 1,

      color: theme.colors.muted,

      margin: 0,

      fit: "shrink",
    });
  }

  /*
   * Decorative element also uses the selected
   * theme colors.
   */

  slide.addShape("ellipse", {
    x: 9.25,
    y: 4.15,
    w: 3.2,
    h: 3.2,

    fill: {
      color: theme.colors.primarySoft,
      transparency: 55,
    },

    line: {
      color: theme.colors.primary,
      transparency: 72,
      width: 1,
    },
  });
}

/* =========================================
   CONTENT
========================================= */

function renderContent(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(
    slide,
    theme,
    slideData.title
  );

  const items = getItems(slideData);

  if (items.length === 0) {
    return;
  }

  const visibleItems = items.slice(0, 6);

  if (visibleItems.length <= 2) {
    visibleItems.forEach((item, index) => {
      const y = 1.55 + index * 2.45;

      addCard(
        slide,
        theme,
        0.75,
        y,
        11.7,
        2.05
      );

      if (item.title) {
        addCardTitle(
          slide,
          theme,
          item.title,
          1.05,
          y + 0.35,
          10.7
        );
      }

      if (item.text) {
        addCardText(
          slide,
          theme,
          item.text,
          1.05,
          y + 0.88,
          10.6,
          0.9
        );
      }
    });

    return;
  }

  if (visibleItems.length === 3) {
    visibleItems.forEach((item, index) => {
      const x = 0.75 + index * 3.9;

      addCard(
        slide,
        theme,
        x,
        1.65,
        3.55,
        4.65
      );

      if (item.label) {
        slide.addText(item.label, {
          x: x + 0.3,
          y: 1.95,
          w: 2.8,
          h: 0.25,

          fontFace: theme.fonts.body,
          fontSize: theme.sizes.small,
          bold: true,

          color: theme.colors.primary,

          margin: 0,

          charSpacing: 1,
        });
      }

      if (item.title) {
        addCardTitle(
          slide,
          theme,
          item.title,
          x + 0.3,
          2.35,
          2.9
        );
      }

      if (item.text) {
        addCardText(
          slide,
          theme,
          item.text,
          x + 0.3,
          3.05,
          2.9,
          2.5
        );
      }
    });

    return;
  }

  const columns = 2;

  visibleItems.forEach((item, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    const x = 0.75 + column * 5.85;
    const y = 1.45 + row * 2.45;

    addCard(
      slide,
      theme,
      x,
      y,
      5.55,
      2.2
    );

    if (item.title) {
      addCardTitle(
        slide,
        theme,
        item.title,
        x + 0.3,
        y + 0.3,
        4.9
      );
    }

    if (item.text) {
      addCardText(
        slide,
        theme,
        item.text,
        x + 0.3,
        y + 0.83,
        4.9,
        1.05
      );
    }
  });
}

/* =========================================
   TWO COLUMN
========================================= */

function renderTwoColumn(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(slide, theme, slideData.title);

  const items = getItems(slideData).slice(0, 2);

  const leftX = 0.75;
  const rightX = 6.25;
  const cardY = 2.15;
  const cardWidth = 5.0;
  const cardHeight = 3.6;

  items.forEach((item, index) => {
    const x = index === 0 ? leftX : rightX;

    slide.addShape("roundRect", {
      x: x,
      y: cardY,
      w: cardWidth,
      h: cardHeight,
      fill: {
        color: theme.colors.surface,
      },
      line: {
        color: theme.colors.border,
        width: theme.style.borderWidth,
      },
    });

    slide.addShape("rect", {
      x: x + 0.35,
      y: cardY + 0.35,
      w: 0.7,
      h: 0.06,
      fill: {
        color: theme.colors.primary,
      },
      line: {
        color: theme.colors.primary,
        transparency: 100,
      },
    });

    slide.addText(
      `0${index + 1}`,
      {
        x: x + 4.2,
        y: cardY + 0.28,
        w: 0.45,
        h: 0.3,
        fontFace: theme.fonts.heading,
        fontSize: 10,
        bold: true,
        color: theme.colors.primary,
        align: "right",
        margin: 0,
      }
    );

    if (item.title) {
      slide.addText(
        item.title,
        {
          x: x + 0.35,
          y: cardY + 0.8,
          w: 4.3,
          h: 0.55,
          fontFace: theme.fonts.heading,
          fontSize: 19,
          bold: true,
          color: theme.colors.text,
          margin: 0,
          fit: "shrink",
        }
      );
    }

    if (item.text) {
      slide.addText(
        item.text,
        {
          x: x + 0.35,
          y: cardY + 1.55,
          w: 4.25,
          h: 1.45,
          fontFace: theme.fonts.body,
          fontSize: theme.sizes.body,
          color: theme.colors.muted,
          margin: 0.02,
          valign: "top",
          fit: "shrink",
        }
      );
    }
  });
}
/* =========================================
   STATS
========================================= */

function renderStats(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(
    slide,
    theme,
    slideData.title
  );

  const items = getItems(slideData).slice(
    0,
    3
  );

  items.forEach((item, index) => {
    const x = 0.75 + index * 3.9;

    addCard(
      slide,
      theme,
      x,
      1.7,
      3.55,
      3.9
    );

    if (item.value) {
      slide.addText(item.value, {
        x: x + 0.3,
        y: 2.25,
        w: 2.9,
        h: 0.8,

        fontFace: theme.fonts.heading,
        fontSize: theme.sizes.stat,
        bold: true,

        color: theme.colors.primary,

        margin: 0,

        fit: "shrink",
      });
    }

    if (item.title) {
      addCardTitle(
        slide,
        theme,
        item.title,
        x + 0.3,
        3.25,
        2.9
      );
    }

    if (item.text) {
      addCardText(
        slide,
        theme,
        item.text,
        x + 0.3,
        3.85,
        2.9,
        1.15
      );
    }
  });
}

/* =========================================
   PROCESS
========================================= */

function renderProcess(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(
    slide,
    theme,
    slideData.title
  );

  const items = getItems(slideData).slice(0, 4);

  const startX = 0.75;
  const cardWidth = 2.75;
  const cardHeight = 3.45;
  const gap = 0.35;
  const y = 2.15;

  items.forEach((item, index) => {
    const x =
      startX +
      index * (cardWidth + gap);

    // Step circle
    slide.addShape("ellipse", {
      x: x + 0.05,
      y: y,
      w: 0.65,
      h: 0.65,

      fill: {
        color: theme.colors.primary,
      },

      line: {
        color: theme.colors.primary,
        transparency: 100,
      },
    });

    slide.addText(
      String(index + 1),
      {
        x: x + 0.05,
        y: y + 0.12,
        w: 0.65,
        h: 0.3,

        fontFace: theme.fonts.heading,
        fontSize: 14,
        bold: true,

        color: theme.colors.white,

        align: "center",
        margin: 0,
      }
    );

    // Step title
    if (item.title) {
      slide.addText(
        item.title,
        {
          x: x,
          y: y + 0.9,
          w: cardWidth,
          h: 0.55,

          fontFace: theme.fonts.heading,
          fontSize: 17,
          bold: true,

          color: theme.colors.text,

          margin: 0,
          breakLine: false,
          fit: "shrink",
        }
      );
    }

    // Step description
    if (item.text) {
      slide.addText(
        item.text,
        {
          x: x,
          y: y + 1.55,
          w: cardWidth,
          h: 1.35,

          fontFace: theme.fonts.body,
          fontSize: theme.sizes.body,

          color: theme.colors.muted,

          margin: 0.02,
          valign: "top",
          fit: "shrink",
        }
      );
    }

    // Connector between steps
    if (index < items.length - 1) {
      slide.addText(
        "→",
        {
          x: x + cardWidth + 0.03,
          y: y + 0.12,
          w: gap - 0.05,
          h: 0.45,

          fontFace: theme.fonts.heading,
          fontSize: 22,
          bold: true,

          color: theme.colors.primary,

          align: "center",
          margin: 0,
        }
      );
    }
  });
}


/* =========================================
   COMPARISON
========================================= */

function renderComparison(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(
    slide,
    theme,
    slideData.title
  );

  const items = getItems(slideData).slice(
    0,
    2
  );

  items.forEach((item, index) => {
    const x =
      index === 0
        ? 0.75
        : 6.55;

    addCard(
      slide,
      theme,
      x,
      1.65,
      5.55,
      4.75
    );

    slide.addText(
      index === 0
        ? "OPTION A"
        : "OPTION B",
      {
        x: x + 0.3,
        y: 1.95,
        w: 2,
        h: 0.25,

        fontFace: theme.fonts.body,
        fontSize: theme.sizes.small,
        bold: true,

        color: theme.colors.primary,

        margin: 0,

        charSpacing: 1,
      }
    );

    if (item.title) {
      addCardTitle(
        slide,
        theme,
        item.title,
        x + 0.3,
        2.45,
        4.8
      );
    }

    if (item.text) {
      addCardText(
        slide,
        theme,
        item.text,
        x + 0.3,
        3.1,
        4.8,
        2.2
      );
    }
  });
}

/* =========================================
   FEATURE GRID
========================================= */

function renderFeatureGrid(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(
    slide,
    theme,
    slideData.title
  );

  const items = getItems(slideData).slice(
    0,
    6
  );

  items.forEach((item, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);

    const x = 0.75 + column * 3.9;
    const y = 1.55 + row * 2.45;

    addCard(
      slide,
      theme,
      x,
      y,
      3.55,
      2.1
    );

    slide.addShape(
      "ellipse",
      {
        x: x + 0.3,
        y: y + 0.3,
        w: 0.42,
        h: 0.42,

        fill: {
          color: theme.colors.primarySoft,
        },

        line: {
          color: theme.colors.primary,
          transparency: 100,
        },
      }
    );

    if (item.title) {
      addCardTitle(
        slide,
        theme,
        item.title,
        x + 0.3,
        y + 0.95,
        2.9
      );
    }

    if (item.text) {
      addCardText(
        slide,
        theme,
        item.text,
        x + 0.3,
        y + 1.38,
        2.9,
        0.55
      );
    }
  });
}

/* =========================================
   HIGHLIGHT
========================================= */

function renderHighlight(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(
    slide,
    theme,
    slideData.title
  );

  const item = getItems(slideData)[0];

  addCard(
    slide,
    theme,
    1.1,
    1.7,
    11.1,
    4.55
  );

  slide.addText("THE BIG IDEA", {
    x: 1.6,
    y: 2.2,
    w: 2.5,
    h: 0.25,

    fontFace: theme.fonts.body,
    fontSize: theme.sizes.small,
    bold: true,

    color: theme.colors.primary,

    margin: 0,

    charSpacing: 1.3,
  });

  if (item?.title) {
    slide.addText(item.title, {
      x: 1.6,
      y: 2.8,
      w: 9.7,
      h: 1.1,

      fontFace: theme.fonts.heading,
      fontSize: theme.sizes.title + 4,
      bold: true,

      color: theme.colors.text,

      margin: 0,

      fit: "shrink",
    });
  }

  if (item?.text) {
    slide.addText(item.text, {
      x: 1.6,
      y: 4.2,
      w: 8.8,
      h: 0.85,

      fontFace: theme.fonts.body,
      fontSize: theme.sizes.body + 1,

      color: theme.colors.muted,

      margin: 0,

      fit: "shrink",
    });
  }

  slide.addShape(
    "ellipse",
    {
      x: 9.9,
      y: 4.6,
      w: 1.4,
      h: 1.4,

      fill: {
        color: theme.colors.primary,
        transparency: 80,
      },

      line: {
        color: theme.colors.primary,
        transparency: 100,
      },
    }
  );
}

/* =========================================
   CONCLUSION
========================================= */

function renderConclusion(
  slide: PptxSlide,
  slideData: PresentationSlide,
  theme: PresentationTheme
) {
  addHeader(
    slide,
    theme,
    slideData.title
  );

  const items = getItems(slideData).slice(
    0,
    4
  );

  items.forEach((item, index) => {
    const y = 1.55 + index * 1.25;

    slide.addShape(
      "ellipse",
      {
        x: 0.8,
        y: y + 0.05,
        w: 0.35,
        h: 0.35,

        fill: {
          color: theme.colors.primary,
        },

        line: {
          color: theme.colors.primary,
          transparency: 100,
        },
      }
    );

    if (item.title) {
      slide.addText(item.title, {
        x: 1.4,
        y,
        w: 4.5,
        h: 0.35,

        fontFace: theme.fonts.heading,
        fontSize: 16,
        bold: true,

        color: theme.colors.text,

        margin: 0,

        fit: "shrink",
      });
    }

    if (item.text) {
      slide.addText(item.text, {
        x: 5.2,
        y,
        w: 6.3,
        h: 0.55,

        fontFace: theme.fonts.body,
        fontSize: theme.sizes.body,

        color: theme.colors.muted,

        margin: 0,

        fit: "shrink",
      });
    }
  });
}