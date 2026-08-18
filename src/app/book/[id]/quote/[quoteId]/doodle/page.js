import Link from "next/link";

import getDoodle from "@/lib/doodles/getDoodle";

import DoodleClient from "./DoodleClient";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";
import ThemeDecoratives from "@/app/components/themes/ThemeDecoratives";

const DoodleServer = async ({ params }) => {
    const { quoteId, id } = await params;

    const doodle = await getDoodle(quoteId);

    return (
        <ThemeBackground>
            <ThemeAtmosphere />

            <ThemeDecoratives />

            <main
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    max-w-7xl
                    flex-col
                    gap-8
                    px-6
                    py-8
                    sm:px-8
                    lg:py-12
                "
            >
                <header
                    className="
                        flex
                        flex-col
                        gap-3
                    "
                >
                    <Link
                        href={`/book/${id}/quote/${quoteId}`}
                        style={{
                            fontFamily:
                                "var(--font-body)",

                            fontSize:
                                "var(--font-size-base)",

                            fontWeight:
                                "var(--font-weight-medium)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        ← Back to Quote
                    </Link>

                    <h1
                        style={{
                            fontFamily:
                                "var(--font-heading)",

                            fontSize:
                                "var(--font-size-3xl)",

                            fontWeight:
                                "var(--font-weight-bold)",

                            lineHeight:
                                "var(--line-height-heading)",

                            letterSpacing:
                                "var(--letter-spacing-heading)",

                            color:
                               "var(--text-on-background)",
                        }}
                    >
                        Doodle Studio
                    </h1>

                    <p
                        style={{
                            fontFamily:
                                "var(--font-body)",

                            fontSize:
                                "var(--font-size-lg)",

                            fontWeight:
                                "var(--font-weight-normal)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        Capture thoughts that words
                        cannot.
                    </p>
                </header>

                <DoodleClient
                    doodle={doodle}
                    quoteId={quoteId}
                    id={id}
                />
            </main>
        </ThemeBackground>
    );
};

export default DoodleServer;