import Link from "next/link";

import Button from "./components/ui/Button";
import Card from "./components/ui/Card";

import ThemeBackground from "./components/themes/ThemeBackground";
import ThemeAtmosphere from "./components/themes/ThemeAtmosphere";
import SharedIllustration from "./components/themes/SharedIllustration";

const features = [
    {
        illustration: "bookshelf",
        title: "Organize your books",
        description:
            "Build your own digital bookshelf and keep every story within reach.",
    },
    {
        illustration: "open-book",
        title: "Save meaningful quotes",
        description:
            "Preserve the lines that stayed with you long after you turned the page.",
    },
    {
        illustration: "reading",
        title: "Write reflections",
        description:
            "Record your thoughts, emotions, and discoveries as you read.",
    },
    {
        illustration: "empty-doodle",
        title: "Create doodles",
        description:
            "Sketch ideas, symbols, and moments that deserve more than words.",
    },
    {
        illustration: "open-book",
        title: "AI companion",
        description:
            "Explore themes, ask questions, and uncover new perspectives on every story.",
    },
];

export default function Home() {
    return (
        <ThemeBackground className="min-h-screen overflow-hidden">
            <ThemeAtmosphere
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-0
                    opacity-30
                "
            />

            <main
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    max-w-7xl
                    flex-col
                    gap-20
                    px-6
                    py-12
                    sm:px-8
                    lg:py-20
                "
            >
                <section
                    className="
                        grid
                        items-center
                        gap-10
                        lg:grid-cols-2
                    "
                >
                    <div
                        className="
                            flex
                            max-w-2xl
                            flex-col
                            gap-6
                        "
                    >
                        <p
                            style={{
                                fontFamily:
                                    "var(--font-body)",

                                fontSize:
                                    "var(--font-size-sm)",

                                fontWeight:
                                    "var(--font-weight-semibold)",

                                color:
                                    "var(--primary)",

                                letterSpacing:
                                    "var(--letter-spacing-wide)",
                            }}
                        >
                            YOUR PERSONAL READING JOURNAL
                        </p>

                        <h1
                            style={{
                                fontFamily:
                                    "var(--font-heading)",

                                fontSize:
                                    "var(--font-size-4xl)",

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
                            Between the Lines
                        </h1>

                        <p
                            className="max-w-2xl"
                            style={{
                                fontFamily:
                                    "var(--font-body)",

                                fontSize:
                                    "var(--font-size-lg)",

                                fontWeight:
                                    "var(--font-weight-regular)",

                                lineHeight:
                                    "var(--line-height-body)",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            Your personal reading journal
                            to save books, memorable
                            quotes, reflections, doodles,
                            and more.
                        </p>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-4
                            "
                        >
                            <Link href="/signup">
                                <Button>
                                    Start your journal
                                </Button>
                            </Link>

                            <Link href="/login">
                                <Button variant="ghost">
                                    Log In
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <SharedIllustration
                            name="reading"
                            alt=""
                            width={700}
                            height={550}
                            priority
                            className="
                                h-auto
                                max-h-[32rem]
                                w-full
                                max-w-xl
                                object-contain
                            "
                        />
                    </div>
                </section>

                <section className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
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

                                letterSpacing:
                                    "var(--letter-spacing-heading)",

                                color:
                                    "var(--text-primary)",
                            }}
                        >
                            Everything your reading life
                            needs
                        </h2>

                        <p
                            className="max-w-2xl"
                            style={{
                                fontFamily:
                                    "var(--font-body)",

                                fontSize:
                                    "var(--font-size-base)",

                                fontWeight:
                                    "var(--font-weight-regular)",

                                lineHeight:
                                    "var(--line-height-body)",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            Keep the books you love,
                            the words that stay with you,
                            and the thoughts they inspire
                            together.
                        </p>
                    </div>

                    <div
                        className="
                            grid
                            gap-6
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {features.map((feature) => (
                            <Card
                                key={feature.title}
                                className="
                                    flex
                                    flex-col
                                    gap-5
                                    p-6
                                "
                            >
                                <SharedIllustration
                                    name={
                                        feature.illustration
                                    }
                                    alt=""
                                    width={180}
                                    height={180}
                                    className="
                                        h-32
                                        w-32
                                        object-contain
                                    "
                                />

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-2
                                    "
                                >
                                    <h3
                                        style={{
                                            fontFamily:
                                                "var(--font-heading)",

                                            fontSize:
                                                "var(--font-size-xl)",

                                            fontWeight:
                                                "var(--font-weight-semibold)",

                                            lineHeight:
                                                "var(--line-height-heading)",

                                            color:
                                                "var(--text-primary)",
                                        }}
                                    >
                                        {feature.title}
                                    </h3>

                                    <p
                                        style={{
                                            fontFamily:
                                                "var(--font-body)",

                                            fontSize:
                                                "var(--font-size-base)",

                                            fontWeight:
                                                "var(--font-weight-regular)",

                                            lineHeight:
                                                "var(--line-height-body)",

                                            color:
                                                "var(--text-secondary)",
                                        }}
                                    >
                                        {
                                            feature.description
                                        }
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </ThemeBackground>
    );
}