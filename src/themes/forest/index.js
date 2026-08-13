export const forestTheme = {
    id: "forest",
    name: "Forest-Archive",

    description:
        "Every page is another trail waiting to be explored.",

    materials: {
        paper: "recycled paper",
        wood: "oak",
        ink: "pine ink",
        metal: "bronze",
        leaf: "fern",
        accent: "moss",
    },

    colors: {
        background: "#edf3eb",

        surface: "#f8fbf7",
        surfaceHover: "#e4ede1",
        surfaceSecondary: "#d8e5d3",

        primary: "#365c3b",
        primaryForeground: "#ffffff",

        secondary: "#7c9b6c",
        secondaryForeground: "#1f2a1f",

        accent: "#5e8b5a",
        accentForeground: "#ffffff",

        border: "#b7c9b0",

        textPrimary: "#243126",
        textSecondary: "#4b5e4e",
        textMuted: "#708072",

        success: "#4d7c59",
        warning: "#b38752",
        danger: "#9a4e4e",

        highlight: "#d7e6b5",
    },

    typography: {
    fonts: {
        heading: "var(--font-merriweather)",
        body: "var(--font-source-sans)",
        quote: "var(--font-baskerville)",
        handwriting: "var(--font-patrick-hand)",
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
        heading: "0.02em",
    },
},

    shapes: {
        radius: {
            sm: "8px",
            md: "12px",
            lg: "16px",
            xl: "20px",
            pill: "999px",
        },

        borders: {
            subtle: "1px",
            normal: "2px",
            strong: "3px",
        },
    },

    shadows: {
        card: "0 6px 18px rgba(36, 49, 38, 0.08)",
        button: "0 3px 10px rgba(36, 49, 38, 0.08)",
        floating: "0 12px 30px rgba(36, 49, 38, 0.12)",
        inset: "inset 0 2px 6px rgba(36, 49, 38, 0.05)",
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
        welcome:
            "Every page is another trail waiting to be explored.",

        emptyBooks:
            "Your shelves are waiting for another journey.",

        emptyQuotes:
            "The forest is quiet. Collect the words that speak to you.",

        emptyReflections:
            "Some thoughts need time to take root.",

        emptyDiscussions:
            "No conversations have echoed through the archive yet.",

        emptyDoodles:
            "The next sketch begins with a single line.",
    },

    assets: {
        textures: [
            "oak-grain",
            "recycled-paper",
            "moss",
            "fern",
        ],

        icons: [
            "pine-cone",
            "compass",
            "leaf",
            "lantern",
            "acorn",
        ],

        illustrations: [
            "mountains",
            "trees",
            "forest-path",
        ],
    },
};