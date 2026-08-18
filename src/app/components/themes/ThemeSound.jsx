"use client";

import { useEffect, useRef, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import { getThemeAsset } from "@/lib/theme/getThemeAsset";

export default function ThemeSound({
    autoPlay = false,
    loop = true,
    volume = 1,
}) {
    const { theme } = useTheme();

    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] =
        useState(false);

    const sound = getThemeAsset(
        theme,
        "sound"
    );

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        audio.pause();
        audio.currentTime = 0;

        setIsPlaying(false);

        if (!sound) {
            return;
        }

        audio.src = sound;
        audio.loop = loop;
        audio.volume = volume;
        audio.load();

        if (autoPlay) {
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    setIsPlaying(false);
                });
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [
        sound,
        autoPlay,
        loop,
        volume,
    ]);

    const toggleSound = async () => {
        const audio = audioRef.current;

        if (!audio || !sound) {
            return;
        }

        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }

            return;
        }

        audio.pause();
        setIsPlaying(false);
    };

    if (!sound) {
        return null;
    }

    return (
        <>
            <audio
                ref={audioRef}
                preload="none"
            />

            <button
                type="button"
                onClick={toggleSound}
                aria-label={
                    isPlaying
                        ? "Turn ambience off"
                        : "Turn ambience on"
                }
            >
                {isPlaying
                    ? "Sound On"
                    : "Sound Off"}
            </button>
        </>
    );
}