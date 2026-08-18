import Link from "next/link";

import LogIn from "../actions/LogIn";

import ThemeBackground from "../components/themes/ThemeBackground";
import ThemeAtmosphere from "../components/themes/ThemeAtmosphere";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Divider from "../components/ui/Divider";
import Input from "../components/ui/Input";
import PasswordInput from "../components/PasswordInput";
import GoogleSignIn from "../components/GoogleSignIn";

const LoginPage = async ({ searchParams }) => {
    const {
        email = "",
        registered,
    } = await searchParams;

    return (
        <ThemeBackground className="min-h-screen overflow-hidden">
            <ThemeAtmosphere
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-0
                    opacity-20
                "
            />

            <main
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    p-6
                    sm:p-8
                "
            >
                <Card
                    className="
                        flex
                        w-full
                        max-w-xl
                        flex-col
                        gap-6
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
                            Welcome back
                        </h1>

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
                            Your bookshelf has been
                            waiting for you.
                        </p>
                    </div>

                    {registered && (
                        <p
                            style={{
                                fontFamily:
                                    "var(--font-body)",

                                fontSize:
                                    "var(--font-size-sm)",

                                fontWeight:
                                    "var(--font-weight-medium)",

                                lineHeight:
                                    "var(--line-height-body)",

                                color:
                                    "var(--success)",
                            }}
                        >
                            Account created
                            successfully. Please log
                            in to continue.
                        </p>
                    )}

                    <form
                        action={LogIn}
                        className="
                            flex
                            flex-col
                            gap-4
                        "
                    >
                        <label
                            htmlFor="email"
                            style={{
                                fontFamily:
                                    "var(--font-body)",

                                fontSize:
                                    "var(--font-size-sm)",

                                fontWeight:
                                    "var(--font-weight-semibold)",

                                color:
                                    "var(--text-primary)",
                            }}
                        >
                            Email
                        </label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            defaultValue={email}
                        />

                        <label
                            htmlFor="password"
                            style={{
                                fontFamily:
                                    "var(--font-body)",

                                fontSize:
                                    "var(--font-size-sm)",

                                fontWeight:
                                    "var(--font-weight-semibold)",

                                color:
                                    "var(--text-primary)",
                            }}
                        >
                            Password
                        </label>

                        <PasswordInput
                            name="password"
                            placeholder="Enter your password"
                        />

                        <Button type="submit">
                            Log In
                        </Button>
                    </form>

                    <Divider />

                    <GoogleSignIn />

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                        "
                    >
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
                            New here?
                        </p>

                        <Link href="/signup">
                            <Button variant="ghost">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </Card>
            </main>
        </ThemeBackground>
    );
};

export default LoginPage;