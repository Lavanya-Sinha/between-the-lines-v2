"use client";

import Image from "next/image";

import { getSharedAsset } from "@/lib/theme/getSharedAssets";

export default function SharedIllustration({
    name,
    alt = "",
    className = "",
    width = 600,
    height = 600,
    priority = false,
}) {
    const src = getSharedAsset(name);

    if (!src) {
        return null;
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={className}
        />
    );
}