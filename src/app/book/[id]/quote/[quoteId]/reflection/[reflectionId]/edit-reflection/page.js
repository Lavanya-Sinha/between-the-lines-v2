import Link from "next/link";

import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";

import UpdateReflection from "@/app/actions/UpdateReflection";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";
import Textarea from "@/app/components/ui/Textarea";

const EditReflectionPage = async ({ params }) => {
    await requireUser();

    const {
        reflectionId,
        quoteId,
        id,
    } = await params;

    const reflection =
        await prisma.reflections.findUnique({
            where: {
                id: Number.parseInt(
                    reflectionId
                ),
            },
            include: {
                quote: {
                    include: {
                        book: true,
                    },
                },
            },
        });

    if (!reflection) {
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
                        Reflection not found.
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
                <Link
                    href={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}`}
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
                    ← Back to Reflection
                </Link>

                <Card
                    className="
                        flex
                        flex-col
                        gap-2
                        p-6
                    "
                >
                    <h2
                        style={{
                            fontFamily:
                                "var(--font-heading)",

                            fontSize:
                                "var(--font-size-2xl)",

                            fontWeight:
                                "var(--font-weight-semibold)",

                            lineHeight:
                                "var(--line-height-heading)",

                            color:
                                "var(--text-primary)",
                        }}
                    >
                        {reflection.quote.book.title}
                    </h2>

                    <p
                        style={{
                            fontFamily:
                                "var(--font-body)",

                            fontSize:
                                "var(--font-size-base)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-muted)",
                        }}
                    >
                        {reflection.quote.book.author}
                    </p>
                </Card>

                <Card
                    className="
                        flex
                        flex-col
                        gap-6
                        p-6
                        sm:p-8
                    "
                >
                    <div className="flex flex-col gap-2">
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
                                    "var(--text-primary)",
                            }}
                        >
                            Edit Reflection
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
                                    "var(--text-secondary)",
                            }}
                        >
                            Revisit your thoughts and refine
                            them whenever you wish.
                        </p>
                    </div>

                    <Divider />

                    <form
                        action={UpdateReflection}
                        className="
                            flex
                            flex-col
                            gap-6
                        "
                    >
                        <Textarea
                            name="content"
                            defaultValue={
                                reflection.content
                            }
                            rows={10}
                            className="min-h-72"
                            style={{
                                fontFamily:
                                    "var(--font-handwriting)",

                                fontSize:
                                    "var(--font-size-xl)",

                                lineHeight:
                                    "var(--line-height-body)",

                                color:
                                    "var(--text-primary)",
                            }}
                        />

                        <input
                            type="hidden"
                            name="reflection_id"
                            value={reflection.id}
                        />

                        <input
                            type="hidden"
                            name="quote_id"
                            value={
                                reflection.quote_id
                            }
                        />

                        <input
                            type="hidden"
                            name="book_id"
                            value={id}
                        />

                        <div className="self-start">
                            <Button type="submit">
                                Save Reflection
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </ThemeBackground>
    );
};

export default EditReflectionPage;