"use client";

import Image from "next/image";

import { useTheme } from "@/context/ThemeContext";
import { getThemeAsset } from "@/lib/theme/getThemeAsset";

const decorativePlacement = {
    autumn: {
        className:
            "-left-24 -bottom-20 w-[500px]",
    },

    forest: {
        className:
            "-right-24 -bottom-20 w-[500px]",
    },

    diary: {
        className:
            "-right-24 -top-16 w-[480px]",
    },

    rain: {
        className:
            "-right-24 -bottom-16 w-[480px]",
    },

    night: {
        className:
            "-left-24 -bottom-20 w-[500px]",
    },
};

export default function ThemeDecoratives({
    className = "",
}) {
    const { theme } = useTheme();

    const decorative = getThemeAsset(
        theme,
        "decorative"
    );

    if (!decorative) {
        return null;
    }

    const placement =
        decorativePlacement[theme.id] ??
        decorativePlacement.autumn;

    return (
        <div
            className={`
                pointer-events-none
                absolute
                z-10
                ${placement.className}
                ${className}
            `}
        >
            <Image
                src={decorative}
                alt=""
                width={1536}
                height={1024}
                className="h-auto w-full object-contain"
            />
        </div>
    );
}