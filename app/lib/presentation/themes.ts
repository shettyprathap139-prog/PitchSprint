export type PresentationTheme = {
  id: string;
  name: string;
  description: string;

  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    primary: string;
    primarySoft: string;
    text: string;
    muted: string;
    border: string;
    white: string;
  };

  fonts: {
    heading: string;
    body: string;
  };

  sizes: {
    title: number;
    sectionTitle: number;
    body: number;
    small: number;
    stat: number;
  };

  style: {
    radius: number;
    borderWidth: number;
    cardPadding: number;
    shadow: boolean;
  };
};

export const PRESENTATION_THEMES: Record<
  string,
  PresentationTheme
> = {
  "modern-dark": {
    id: "modern-dark",
    name: "Modern Dark",
    description:
      "Dark navy presentation with blue accents and a premium technology feel.",

    colors: {
      background: "071A33",
      surface: "0D2747",
      surfaceAlt: "102F53",
      primary: "3B82F6",
      primarySoft: "163B69",
      text: "F8FAFC",
      muted: "9FB3CC",
      border: "285078",
      white: "FFFFFF",
    },

    fonts: {
      heading: "Aptos Display",
      body: "Aptos",
    },

    sizes: {
      title: 30,
      sectionTitle: 25,
      body: 15,
      small: 10,
      stat: 30,
    },

    style: {
      radius: 0.18,
      borderWidth: 1,
      cardPadding: 0.22,
      shadow: false,
    },
  },

  "clean-light": {
    id: "clean-light",
    name: "Clean Light",
    description:
      "Bright professional presentation focused on clarity and readability.",

    colors: {
      background: "F8FAFC",
      surface: "FFFFFF",
      surfaceAlt: "F1F5F9",
      primary: "2563EB",
      primarySoft: "DBEAFE",
      text: "0F172A",
      muted: "64748B",
      border: "CBD5E1",
      white: "FFFFFF",
    },

    fonts: {
      heading: "Aptos Display",
      body: "Aptos",
    },

    sizes: {
      title: 30,
      sectionTitle: 25,
      body: 15,
      small: 10,
      stat: 30,
    },

    style: {
      radius: 0.18,
      borderWidth: 1,
      cardPadding: 0.22,
      shadow: false,
    },
  },

  minimal: {
    id: "minimal",
    name: "Minimal",
    description:
      "Simple editorial style with restrained colors and maximum readability.",

    colors: {
      background: "F8F7F4",
      surface: "FFFFFF",
      surfaceAlt: "F1F0EC",
      primary: "111827",
      primarySoft: "E5E7EB",
      text: "111827",
      muted: "6B7280",
      border: "D1D5DB",
      white: "FFFFFF",
    },

    fonts: {
      heading: "Aptos Display",
      body: "Aptos",
    },

    sizes: {
      title: 31,
      sectionTitle: 25,
      body: 15,
      small: 10,
      stat: 31,
    },

    style: {
      radius: 0.1,
      borderWidth: 1,
      cardPadding: 0.2,
      shadow: false,
    },
  },

  bold: {
    id: "bold",
    name: "Bold",
    description:
      "High-impact presentation with strong typography and visual contrast.",

    colors: {
      background: "111827",
      surface: "1F2937",
      surfaceAlt: "273449",
      primary: "60A5FA",
      primarySoft: "1E3A5F",
      text: "FFFFFF",
      muted: "CBD5E1",
      border: "475569",
      white: "FFFFFF",
    },

    fonts: {
      heading: "Aptos Display",
      body: "Aptos",
    },

    sizes: {
      title: 34,
      sectionTitle: 27,
      body: 15,
      small: 10,
      stat: 34,
    },

    style: {
      radius: 0.14,
      borderWidth: 1,
      cardPadding: 0.24,
      shadow: false,
    },
  },
};

export function getPresentationTheme(
  themeId?: string
): PresentationTheme {
  if (themeId && PRESENTATION_THEMES[themeId]) {
    return PRESENTATION_THEMES[themeId];
  }

  return PRESENTATION_THEMES["modern-dark"];
}