import Link from "next/link";

import getDoodle from "@/lib/doodles/getDoodle";

import DoodleClient from "./DoodleClient";

const DoodleServer = async ({ params }) => {
    const { quoteId, id } = await params;

    const doodle = await getDoodle(quoteId);

    return (
        <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 p-8">

            <header className="flex flex-col gap-2">

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
                            "var(--text-secondary)",
                    }}
                >
                    Capture thoughts that words cannot.
                </p>

            </header>

            <DoodleClient
                doodle={doodle}
                quoteId={quoteId}
                id={id}
            />

        </main>
    );
};

export default DoodleServer;