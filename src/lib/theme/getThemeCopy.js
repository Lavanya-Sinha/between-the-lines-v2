export function getThemeCopy(theme, path, fallback = "") {
    if (!theme || !path) {
        return fallback;
    }

    const keys = path.split(".");

    let value = theme.copy;

    for (const key of keys) {
        if (
            value === null ||
            value === undefined
        ) {
            return fallback;
        }

        value = value[key];
    }

    return value ?? fallback;
}