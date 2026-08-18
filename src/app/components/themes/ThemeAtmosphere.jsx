"use client";

import Image from "next/image";

import { useTheme } from "@/context/ThemeContext";
import { getThemeAsset } from "@/lib/theme/getThemeAsset";

export default function ThemeAtmosphere({
    className = "",
}) {
    const { theme } = useTheme();

    const atmosphere = getThemeAsset(
        theme,
        "atmosphere"
    );

    if (!atmosphere) {
        return null;
    }

    return (
        <div
            className={`
                pointer-events-none
                absolute
                inset-0
                z-10
                ${className}
            `}
        >
            <Image
                src={atmosphere}
                alt=""
                width={1600}
                height={900}
                className="h-full w-full object-cover"
                priority={false}
            />
        </div>
    );
}