"use client";

import { useTheme } from "@/context/ThemeContext";
import { getThemeAsset } from "@/lib/theme/getThemeAsset";

export default function ThemeBackground({
    className = "",
    children,
}) {
    const { theme } = useTheme();

    const background =
        getThemeAsset(
            theme,
            "background"
        );

return (
    <div
        className={`relative overflow-hidden ${className}`}
        style={{
            backgroundImage: background
                ? `url("${background}")`
                : undefined,

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
    >
        <div className="relative z-30">
            {children}
        </div>
    </div>
);
}