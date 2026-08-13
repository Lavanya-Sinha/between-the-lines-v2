export const autumnTheme = {
    id : "autumn",
    name : "Autumn-Library",

     description: "A warm place where every story feels like home.",

 materials: {
    paper: "aged paper",
    wood: "walnut",
    ink: "coffee ink",
    metal: "brass",
    leaf: "maple leaf",
    accent: "burnt amber",
},

 colors: {
    background: "#f5efe6",

    surface: "#fffaf2",
    surfaceHover: "#f2e9dc",
    surfaceSecondary: "#ebe0d1",

    primary: "#7b4b33",
    primaryForeground: "#ffffff",

    secondary: "#c89f72",
    secondaryForeground: "#2c1810",

    accent: "#d97745",
    accentForeground: "#ffffff",

    border: "#d4c0a8",

    textPrimary: "#2c1810",
    textSecondary: "#5e4636",
    textMuted: "#8c7664",

    success: "#4d7c59",
    warning: "#d97745",
    danger: "#b84a3a",

    highlight: "#f4d58d",
},
typography: {
    fonts: {
        heading: "var(--font-cormorant)",
        body: "var(--font-lora)",
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
        body: 1.7,
        heading: 1.3,
        quote: 1.8,
    },

    letterSpacing: {
        body: "0",
        heading: "0.02em",
    },
},

shapes: {
    radius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
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
    card: "0 4px 12px rgba(0,0,0,0.08)",
    floating: "0 8px 24px rgba(0,0,0,0.12)",
    button: "0 2px 8px rgba(0,0,0,0.08)",
    inset: "inset 0 1px 2px rgba(0,0,0,0.05)",
},

 motion: {
    duration: {
        instant: "100ms",
        fast: "200ms",
        normal: "300ms",
        slow: "500ms",
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
        button: "all 0.2s ease",
        card: "all 0.3s ease",
        modal: "all 0.3s ease-out",
    },
},

  copy: {
    emptyStates: {
        books:
            "Your bookshelf is waiting for its first story.",

        quotes:
            "Every memorable line has a home here.",

        reflections:
            "Some thoughts need a little time before they find their words.",

        discussions:
            "Every conversation begins with a single thought.",

        doodles:
            "An empty page is an invitation to create.",
    },

    buttons: {
        save: "Save",
        delete: "Delete",
        continue: "Continue discussion",
    },

    placeholders: {
        reflection:
            "Write what this passage means to you...",

        discussion:
            "Share your thoughts with your companion...",

        search:
            "Search your library...",
    },
},

  assets: {
    textures: [
        "aged-paper",
        "kraft-paper",
        "tea-stain",
        "linen",
        "oak-grain",
    ],

    icons: [
        "maple-leaf",
        "acorn",
        "feather",
        "bookmark",
        "wax-seal",
    ],

    illustrations: [
        "bookshelf",
        "window",
        "lantern",
        "stack-of-books",
        "reading-chair",
    ],

    decorativeElements: [
        "pressed-leaves",
        "coffee-ring",
        "handwritten-lines",
        "ink-splatter",
    ],
},

}