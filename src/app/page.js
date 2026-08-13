import Link from "next/link";

import Button from "./components/ui/Button";
import Card from "./components/ui/Card";

const features = [
    {
        icon: "📚",
        title: "Organize your books",
        description:
            "Build your own digital bookshelf and keep every story within reach.",
    },
    {
        icon: "💭",
        title: "Save meaningful quotes",
        description:
            "Preserve the lines that stayed with you long after you turned the page.",
    },
    {
        icon: "📝",
        title: "Write reflections",
        description:
            "Record your thoughts, emotions, and discoveries as you read.",
    },
    {
        icon: "🎨",
        title: "Create doodles",
        description:
            "Sketch ideas, symbols, and moments that deserve more than words.",
    },
    {
        icon: "🤖",
        title: "AI companion",
        description:
            "Explore themes, ask questions, and uncover new perspectives on every story.",
    },
];

export default function Home() {
    return (
        <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-16 px-8 py-12">

            <section className="flex flex-col gap-8">

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
                    Your personal reading journal to save
                    books, memorable quotes, reflections,
                    doodles, and more.
                </p>

                <div className="flex gap-4">
                    <Link href="/signup">
                        <Button>
                            Sign Up
                        </Button>
                    </Link>

                    <Link href="/login">
                        <Button variant="ghost">
                            Log In
                        </Button>
                    </Link>
                </div>

            </section>

            <section>

                <h2
                    className="mb-8"
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
                    }}
                >
                    Features
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="flex flex-col gap-4 p-8"
                        >
                            <span className="text-4xl">
                                {feature.icon}
                            </span>

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
                                {feature.description}
                            </p>
                        </Card>
                    ))}

                </div>

            </section>

        </main>
    );
}
