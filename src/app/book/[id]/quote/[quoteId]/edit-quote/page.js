import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";

import UpdateQuote from "@/app/actions/UpdateQuote";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Textarea from "@/app/components/ui/Textarea";

const EditQuotePage = async ({ params }) => {
    await requireUser();

    const { quoteId, id } = await params;

    const quote = await prisma.quotes.findUnique({
        where: {
            id: Number.parseInt(quoteId),
        },
    });

    if (!quote) {
        return (
            <ThemeBackground>
                <ThemeAtmosphere />

                <main
                    className="
                        relative
                        z-10
                        p-8
                    "
                >
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

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        Quote not found.
                    </h1>
                </main>
            </ThemeBackground>
        );
    }

    return (
        <ThemeBackground>
            <ThemeAtmosphere />

            <main
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    max-w-6xl
                    flex-col
                    gap-8
                    px-6
                    py-8
                    sm:px-8
                    lg:py-12
                "
            >
                <header className="flex flex-col gap-2">
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
                        Edit Quote
                    </h1>

                    <p
                        style={{
                            fontFamily:
                                "var(--font-body)",

                            fontSize:
                                "var(--font-size-base)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        Refine the passage you saved.
                    </p>
                </header>

                <Card className="p-6 sm:p-14">
                    <form
                        action={UpdateQuote}
                        className="
                            flex
                            flex-col
                            gap-6
                        "
                    >
                        <Textarea
                            name="text"
                            rows={8}
                            defaultValue={quote.text}
                            style={{
                                fontFamily:
                                    "var(--font-quote)",

                                fontSize:
                                    "var(--font-size-xl)",

                                lineHeight:
                                    "var(--line-height-quote)",

                                color:
                                    "var(--text-primary)",
                            }}
                        />

                        <input
                            type="hidden"
                            name="quote_id"
                            value={quote.id}
                        />

                        <input
                            type="hidden"
                            name="book_id"
                            value={id}
                        />

                        <Button type="submit">
                            Save Changes
                        </Button>
                    </form>
                </Card>
            </main>
        </ThemeBackground>
    );
};

export default EditQuotePage;
