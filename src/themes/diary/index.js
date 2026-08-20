export const diaryTheme = {
  id: "diary",
  name: "The-Diary",

  description: "Every memory deserves a page of its own.",

  materials: {
    paper: "journal paper",
    wood: "cedar",
    ink: "fountain-pen ink",
    metal: "rose gold",
    leaf: "pressed flower",
    accent: "linen",
  },

  colors: {
    background: "#f8f3ef",

    surface: "#fffdfb",
    surfaceHover: "#f0e7df",
    surfaceSecondary: "#e6dad0",

    primary: "#8d5c63",
    primaryForeground: "#ffffff",

    secondary: "#c79c8b",
    secondaryForeground: "#2d1f22",

    accent: "#b6787a",
    accentForeground: "#ffffff",

    border: "#d8c3b8",

    textPrimary: "#372729",
    textSecondary: "#685254",
    textMuted: "#90787a",

    textOnBackground: "#D0C8CA",
    textOnBackgroundSecondary: "#B8AFB2",
    textOnBackgroundMuted: "#9D9498",

    success: "#64826a",
    warning: "#c18b67",
    danger: "#a05555",

    highlight: "#f3d8d8",
  },

  typography: {
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-dm-sans)",
      quote: "var(--font-cormorant)",
      handwriting: "var(--font-caveat)",
    },

    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
    },

    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeights: {
      body: 1.8,
      heading: 1.3,
      quote: 1.9,
    },

    letterSpacing: {
      body: "0",
      heading: "0.01em",
    },
  },

  shapes: {
    radius: {
      sm: "8px",
      md: "12px",
      lg: "18px",
      xl: "24px",
      pill: "999px",
    },

    borders: {
      subtle: "1px",
      normal: "2px",
      strong: "3px",
    },
  },

  shadows: {
    card: "0 6px 20px rgba(55,39,41,0.08)",
    button: "0 3px 10px rgba(55,39,41,0.08)",
    floating: "0 12px 30px rgba(55,39,41,0.12)",
    inset: "inset 0 2px 6px rgba(55,39,41,0.05)",
  },

  motion: {
    duration: {
      instant: "100ms",
      fast: "150ms",
      normal: "250ms",
      slow: "400ms",
    },

    easing: {
      standard: "ease",
      entrance: "ease-out",
      exit: "ease-in",
    },

    scale: {
      hover: 1.02,
      pressed: 0.98,
    },

    transitions: {
      button: "all 0.15s ease",
      card: "all 0.25s ease",
      modal: "all 0.4s ease-out",
    },
  },

  copy: {
    welcome: "Every memory deserves a page of its own.",

    emptyStates: {
      books: "Your bookshelf is waiting patiently.",

      quotes: "The words that move you will find their place here.",

      reflections: "Every reflection begins with a single thought.",

      discussions: "No conversations have been written yet.",

      doodles: "The next sketch begins with a blank page.",
    },

    buttons: {
      save: "Save",
      delete: "Delete",
      continue: "Continue discussion",
    },

    placeholders: {
      reflection: "Write what this passage means to you...",

      discussion: "Share your thoughts with your companion...",

      search: "Search your library...",
    },
  },

  assets: {
    background: "background",
    atmosphere: "atmosphere",
    decorative: "decorative",
    sound: "ambience",
  },
};
