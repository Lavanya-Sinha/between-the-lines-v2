import {
    Cormorant_Garamond,
    Lora,
    Caveat,
    Merriweather,
    Playfair_Display,
    Source_Sans_3,
    Libre_Baskerville,
    DM_Sans,
    Josefin_Sans,
    Nunito_Sans,
    DM_Serif_Display,
    Kalam,
    Cinzel,
    Manrope,
    Patrick_Hand,
} from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "./components/navigation/Navbar";


// ========================================
// Autumn
// ========================================

const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
});

const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
});

const caveat = Caveat({
    variable: "--font-caveat",
    subsets: ["latin"],
});


// ========================================
// Forest
// ========================================

const merriweather = Merriweather({
    variable: "--font-merriweather",
    subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
    variable: "--font-source-sans",
    subsets: ["latin"],
});

const baskerville = Libre_Baskerville({
    variable: "--font-baskerville",
    subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
    variable: "--font-patrick-hand",
    subsets: ["latin"],
    weight: "400",
});


// ========================================
// Diary
// ========================================

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
});

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
});


// ========================================
// Rain
// ========================================

const josefinSans = Josefin_Sans({
    variable: "--font-josefin-sans",
    subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
    variable: "--font-nunito-sans",
    subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
    variable: "--font-dm-serif",
    subsets: ["latin"],
    weight: "400",
});

const kalam = Kalam({
    variable: "--font-kalam",
    subsets: ["latin"],
    weight: ["400", "700"],
});


// ========================================
// Night
// ========================================

const cinzel = Cinzel({
    variable: "--font-cinzel",
    subsets: ["latin"],
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});


// ========================================
// Metadata
// ========================================

export const metadata = {
    title: "Between the Lines",
    description:
        "Your personal reading journal.",
};


// ========================================
// Root Layout
// ========================================

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`
                ${cormorant.variable}
                ${lora.variable}
                ${caveat.variable}

                ${merriweather.variable}
                ${sourceSans.variable}
                ${baskerville.variable}
                ${patrickHand.variable}

                ${playfair.variable}
                ${dmSans.variable}

                ${josefinSans.variable}
                ${nunitoSans.variable}
                ${dmSerif.variable}
                ${kalam.variable}

                ${cinzel.variable}
                ${manrope.variable}

                h-full
            `}
        >
            <body className="min-h-full flex flex-col">
                <ThemeProvider>

                    <Navbar />

                    <main className="flex-1">
                        {children}
                    </main>

                </ThemeProvider>
            </body>
        </html>
    );
}