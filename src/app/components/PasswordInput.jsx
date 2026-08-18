"use client";

import { useState } from "react";

import Input from "./ui/Input";

const PasswordInput = ({
    name,
    placeholder,
    disabled = false,
    className = "",
}) => {
    const [showPassword, setShowPassword] =
        useState(false);

    return (
        <div className="relative">
            <Input
                type={
                    showPassword
                        ? "text"
                        : "password"
                }
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                className={`pr-20 ${className}`}
            />

            <button
                type="button"
                onClick={() =>
                    setShowPassword(
                        (value) => !value
                    )
                }
                disabled={disabled}
                aria-label={
                    showPassword
                        ? "Hide password"
                        : "Show password"
                }
               className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 transition-all"
                style={{
                    color:
                        "var(--text-secondary)",

                    fontFamily:
                        "var(--font-body)",

                    fontSize:
                        "var(--font-size-xs)",

                    fontWeight:
                        "var(--font-weight-medium)",

                    borderRadius:
                        "var(--radius-sm)",

                    transitionDuration:
                        "var(--motion-fast)",

                    transitionTimingFunction:
                        "var(--motion-easing-standard)",
                }}
            >
                {showPassword
                    ? "Hide"
                    : "Show"}
            </button>
        </div>
    );
};

export default PasswordInput;
