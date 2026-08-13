"use client";

import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/themes/registry";

import Button from "./ui/Button";

export default function ThemeSelector() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {Object.values(themes).map((currentTheme) => (
                <Button
                    key={currentTheme.id}
                    variant={
                        theme.id === currentTheme.id
                            ? "primary"
                            : "ghost"
                    }
                    onClick={() => setTheme(currentTheme)}
                >
                    {currentTheme.name}
                </Button>
            ))}
        </div>
    );
}