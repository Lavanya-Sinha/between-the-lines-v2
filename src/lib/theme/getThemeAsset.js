const themeAssetPaths = {
    autumn: {
        background:
            "/assets/themes/autumn/background.png",

        atmosphere:
            "/assets/themes/autumn/atmosphere.png",

        decorative:
            "/assets/themes/autumn/decorative.png",

        sound:
            "/assets/themes/autumn/ambience.mp3",
    },

    forest: {
        background:
            "/assets/themes/forest/background.png",

        atmosphere:
            "/assets/themes/forest/atmosphere.png",

        decorative:
            "/assets/themes/forest/decorative.png",

        sound:
            "/assets/themes/forest/ambience.mp3",
    },

    rain: {
        background:
            "/assets/themes/rain/background.png",

        atmosphere:
            "/assets/themes/rain/atmosphere.png",

        decorative:
            "/assets/themes/rain/decorative.png",

        sound:
            "/assets/themes/rain/ambience.mp3",
    },

    diary: {
        background:
            "/assets/themes/diary/background.png",

        atmosphere:
            "/assets/themes/diary/atmosphere.png",

        decorative:
            "/assets/themes/diary/decorative.png",

        sound:
            "/assets/themes/diary/ambience.mp3",
    },

    night: {
        background:
            "/assets/themes/night/background.png",

        atmosphere:
            "/assets/themes/night/atmosphere.png",

        decorative:
            "/assets/themes/night/decorative.png",

        sound:
            "/assets/themes/night/ambience.mp3",
    },
};

export function getThemeAsset(
    theme,
    assetType,
    fallback = null
) {
    if (!theme?.id || !assetType) {
        return fallback;
    }

    return (
        themeAssetPaths[theme.id]?.[assetType] ??
        fallback
    );
}