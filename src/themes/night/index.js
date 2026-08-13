export const nightTheme = {
    id: "night",
    name: "Midnight-Library",

    description:
        "Where the world sleeps and stories stay awake.",

    materials: {
        paper: "moon paper",
        wood: "ebony",
        ink: "midnight ink",
        metal: "silver",
        leaf: "crescent moon",
        accent: "starlight",
    },

    colors: {
        background: "#161a22",

        surface: "#202632",
        surfaceHover: "#2a3140",
        surfaceSecondary: "#313a4c",

        primary: "#4f6480",
        primaryForeground: "#ffffff",

        secondary: "#6b7b97",
        secondaryForeground: "#ffffff",

        accent: "#7f8fb0",
        accentForeground: "#ffffff",

        border: "#40495c",

        textPrimary: "#f4f5f7",
        textSecondary: "#c3c9d4",
        textMuted: "#939cad",

        success: "#5d8a71",
        warning: "#c7a16f",
        danger: "#b56a6a",

        highlight: "#3b465d",
    },

  typography: {
    fonts: {
        heading: "var(--font-cinzel)",
        body: "var(--font-manrope)",
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
        heading: "0.06em",
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
        card: "0 8px 24px rgba(0, 0, 0, 0.25)",
        button: "0 4px 12px rgba(0, 0, 0, 0.18)",
        floating: "0 16px 40px rgba(0, 0, 0, 0.35)",
        inset: "inset 0 2px 8px rgba(0, 0, 0, 0.15)",
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
            hover: 1.01,
            pressed: 0.99,
        },

        transitions: {
            button: "all 0.2s ease",
            card: "all 0.3s ease",
            modal: "all 0.3s ease-out",
        },
    },

    copy: {
        welcome:
            "Where the world sleeps and stories stay awake.",

        emptyBooks:
            "The shelves are quiet tonight.",

        emptyQuotes:
            "The next unforgettable line is still waiting to be discovered.",

        emptyReflections:
            "Tonight's thoughts have yet to be written.",

        emptyDiscussions:
            "No voices echo through the library tonight.",

        emptyDoodles:
            "The page is waiting beneath the moonlight.",
    },

    assets: {
        textures: [
            "moon-paper",
            "starlight",
            "silver-foil",
            "mist",
        ],

        icons: [
            "moon",
            "star",
            "lamp",
            "quill",
            "telescope",
        ],

        illustrations: [
            "night-sky",
            "bookshelf",
            "constellation",
            "lantern",
        ],
    },
};