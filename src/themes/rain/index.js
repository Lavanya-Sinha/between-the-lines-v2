export const rainTheme = {
    id: "rain",
    name: "Rain-Room",

    description:
        "Quiet moments, louder stories.",

    materials: {
        paper: "watercolour paper",
        wood: "driftwood",
        ink: "blue-black ink",
        metal: "silver",
        leaf: "raindrop",
        accent: "mist",
    },

    colors: {
        background: "#eef3f7",

        surface: "#fafcfd",
        surfaceHover: "#e3ebf1",
        surfaceSecondary: "#d7e0e7",

        primary: "#49667d",
        primaryForeground: "#ffffff",

        secondary: "#7f96a8",
        secondaryForeground: "#1e2a33",

        accent: "#6c8fa6",
        accentForeground: "#ffffff",

        border: "#bcc9d4",

        textPrimary: "#26333d",
        textSecondary: "#53616d",
        textMuted: "#7b8792",

        success: "#5c7a68",
        warning: "#b28d67",
        danger: "#985b5b",

        highlight: "#d9e8f2",
    },

typography: {
    fonts: {
        heading: "var(--font-josefin-sans)",
        body: "var(--font-nunito-sans)",
        quote: "var(--font-dm-serif)",
        handwriting: "var(--font-kalam)",
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
        body: "0.01em",
        heading: "0.04em",
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
        card: "0 8px 24px rgba(38, 51, 61, 0.08)",
        button: "0 4px 12px rgba(38, 51, 61, 0.08)",
        floating: "0 12px 30px rgba(38, 51, 61, 0.12)",
        inset: "inset 0 2px 8px rgba(38, 51, 61, 0.05)",
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
            "Quiet moments, louder stories.",

        emptyBooks:
            "The shelves are waiting for the next rainy afternoon.",

        emptyQuotes:
            "Every unforgettable sentence begins with a single page.",

        emptyReflections:
            "Some thoughts arrive as softly as rain.",

        emptyDiscussions:
            "No conversations have disturbed the silence yet.",

        emptyDoodles:
            "The page is waiting for the first brushstroke.",
    },

    assets: {
        textures: [
            "watercolour-paper",
            "mist",
            "fog",
            "rain-glass",
        ],

        icons: [
            "umbrella",
            "cloud",
            "raindrop",
            "teacup",
            "window",
        ],

        illustrations: [
            "rainy-window",
            "street-lamp",
            "clouds",
            "bookshelf",
        ],
    },
};