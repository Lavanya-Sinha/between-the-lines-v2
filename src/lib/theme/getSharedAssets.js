const sharedAssetPaths = {
    bookshelf:
        "/assets/illustrations/bookshelf.png",

    "open-book":
        "/assets/illustrations/open-book.png",

    reading:
        "/assets/illustrations/reading.png",

    "empty-bookshelf":
        "/assets/illustrations/empty-bookshelf.png",

    "empty-quote":
        "/assets/illustrations/empty-quote.png",

    "empty-reflection":
        "/assets/illustrations/empty-reflection.png",

    "empty-doodle":
        "/assets/illustrations/empty-doodle.png",

    "empty-discussion":
        "/assets/illustrations/empty-discussion.png",
};

export function getSharedAsset(
    assetName,
    fallback = null
) {
    if (!assetName) {
        return fallback;
    }

    return (
        sharedAssetPaths[assetName] ??
        fallback
    );
}