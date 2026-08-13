"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    themes,
    defaultTheme,
} from "@/themes/registry";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        const root = document.documentElement;


        Object.entries(theme.colors).forEach(
            ([key, value]) => {
                root.style.setProperty(
                    `--${key.replace(
                        /[A-Z]/g,
                        (letter) =>
                            `-${letter.toLowerCase()}`
                    )}`,
                    value
                );
            }
        );


        Object.entries(
            theme.typography.fonts
        ).forEach(([key, value]) => {
            root.style.setProperty(
                `--font-${key}`,
                value
            );
        });


        Object.entries(
            theme.typography.sizes
        ).forEach(([key, value]) => {
            root.style.setProperty(
                `--font-size-${key}`,
                value
            );
        });


        Object.entries(
            theme.typography.weights
        ).forEach(([key, value]) => {
            root.style.setProperty(
                `--font-weight-${key}`,
                value
            );
        });

        Object.entries(
            theme.typography.lineHeights
        ).forEach(([key, value]) => {
            root.style.setProperty(
                `--line-height-${key}`,
                value
            );
        });


        if (theme.typography.letterSpacing) {
            Object.entries(
                theme.typography.letterSpacing
            ).forEach(([key, value]) => {
                root.style.setProperty(
                    `--letter-spacing-${key}`,
                    value
                );
            });
        }

        Object.entries(
            theme.shapes.radius
        ).forEach(([key, value]) => {
            root.style.setProperty(
                `--radius-${key}`,
                value
            );
        });


        const borders =
            theme.shapes.borders ??
            theme.shapes.borderWidth;

        if (borders) {
            Object.entries(borders).forEach(
                ([key, value]) => {
                    root.style.setProperty(
                        `--border-${key}`,
                        value
                    );
                }
            );
        }

        Object.entries(
            theme.shadows
        ).forEach(([key, value]) => {
            root.style.setProperty(
                `--shadow-${key}`,
                value
            );
        });


        Object.entries(
            theme.motion.duration
        ).forEach(([key, value]) => {
            root.style.setProperty(
                `--motion-${key}`,
                value
            );
        });

        Object.entries(
            theme.motion.easing
        ).forEach(([key, value]) => {
            root.style.setProperty(
                `--motion-easing-${key}`,
                value
            );
        });


        if (theme.motion.scale) {
            Object.entries(
                theme.motion.scale
            ).forEach(([key, value]) => {
                root.style.setProperty(
                    `--scale-${key}`,
                    value
                );
            });
        }


        if (theme.motion.transitions) {
            Object.entries(
                theme.motion.transitions
            ).forEach(([key, value]) => {
                root.style.setProperty(
                    `--transition-${key}`,
                    value
                );
            });
        }


        root.style.setProperty(
            "--theme-id",
            theme.id
        );

        root.style.setProperty(
            "--theme-name",
            theme.name
        );
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                themes,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}