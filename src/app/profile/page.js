import Link from "next/link";

import ProfilePictureMenu from "../components/profile/ProfilePictureMenu";
import ThemeSelector from "../components/ThemeSelector";

import ThemeBackground from "../components/themes/ThemeBackground";
import ThemeAtmosphere from "../components/themes/ThemeAtmosphere";

import getProfile from "@/lib/profile/getProfile";
import { getInitials } from "@/lib/initials/getInitials";

import Logout from "../actions/Logout";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Divider from "../components/ui/Divider";

const ProfilePage = async () => {
    const profile = await getProfile();

    const initials = getInitials(
        profile.displayName
    );

    return (
        <ThemeBackground className="min-h-screen overflow-hidden">
            <ThemeAtmosphere
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    z-0
                    opacity-15
                "
            />

            <main
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    max-w-5xl
                    flex-col
                    gap-8
                    p-6
                    sm:p-8
                "
            >
                <Link
                    href="/dashboard"
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
                            "var(--primary)",
                    }}
                >
                    ← Back to Dashboard
                </Link>

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
                                "var(--text-primary)",
                        }}
                    >
                        My Profile
                    </h1>

                    <p
                        style={{
                            fontFamily:
                                "var(--font-body)",

                            fontSize:
                                "var(--font-size-base)",

                            fontWeight:
                                "var(--font-weight-normal)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-muted)",
                        }}
                    >
                        Your reading journey, all in
                        one place.
                    </p>
                </header>

                <Card
                    className="
                        flex
                        flex-col
                        gap-6
                        p-6
                        sm:p-8
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            items-start
                            gap-6
                            sm:flex-row
                            sm:items-center
                        "
                    >
                        <ProfilePictureMenu
                            profilePicture={
                                profile.profilePicture
                            }
                            displayName={
                                profile.displayName
                            }
                            initials={initials}
                        />

                        <div
                            className="
                                flex
                                flex-col
                                gap-1
                            "
                        >
                            <h2
                                style={{
                                    fontFamily:
                                        "var(--font-heading)",

                                    fontSize:
                                        "var(--font-size-2xl)",

                                    fontWeight:
                                        "var(--font-weight-bold)",

                                    lineHeight:
                                        "var(--line-height-heading)",

                                    color:
                                        "var(--text-primary)",
                                }}
                            >
                                {profile.displayName}
                            </h2>

                            <p
                                style={{
                                    fontFamily:
                                        "var(--font-body)",

                                    fontSize:
                                        "var(--font-size-base)",

                                    fontWeight:
                                        "var(--font-weight-normal)",

                                    lineHeight:
                                        "var(--line-height-body)",

                                    color:
                                        "var(--text-muted)",
                                }}
                            >
                                {profile.email}
                            </p>

                            <p
                                style={{
                                    fontFamily:
                                        "var(--font-body)",

                                    fontSize:
                                        "var(--font-size-sm)",

                                    fontWeight:
                                        "var(--font-weight-normal)",

                                    lineHeight:
                                        "var(--line-height-body)",

                                    color:
                                        "var(--text-muted)",
                                }}
                            >
                                Signed in with{" "}
                                {profile.provider ===
                                "GOOGLE"
                                    ? "Google"
                                    : "Email & Password"}
                            </p>
                        </div>
                    </div>
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
                    <h2
                        style={{
                            fontFamily:
                                "var(--font-heading)",

                            fontSize:
                                "var(--font-size-2xl)",

                            fontWeight:
                                "var(--font-weight-bold)",

                            lineHeight:
                                "var(--line-height-heading)",

                            color:
                                "var(--text-primary)",
                        }}
                    >
                        Reading Statistics
                    </h2>

                    <Divider />

                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                        "
                    >
                        <Card className="p-4">
                            <span
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
                                        "var(--text-primary)",
                                }}
                            >
                                📚 Books:{" "}
                                {profile.stats.books}
                            </span>
                        </Card>

                        <Card className="p-4">
                            <span
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
                                        "var(--text-primary)",
                                }}
                            >
                                💬 Quotes:{" "}
                                {profile.stats.quotes}
                            </span>
                        </Card>

                        <Card className="p-4">
                            <span
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
                                        "var(--text-primary)",
                                }}
                            >
                                ✍️ Reflections:{" "}
                                {profile.stats.reflections}
                            </span>
                        </Card>

                        <Card className="p-4">
                            <span
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
                                        "var(--text-primary)",
                                }}
                            >
                                🎨 Doodles:{" "}
                                {profile.stats.doodles}
                            </span>
                        </Card>
                    </div>
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
                    <h2
                        style={{
                            fontFamily:
                                "var(--font-heading)",

                            fontSize:
                                "var(--font-size-2xl)",

                            fontWeight:
                                "var(--font-weight-bold)",

                            lineHeight:
                                "var(--line-height-heading)",

                            color:
                                "var(--text-primary)",
                        }}
                    >
                        Appearance
                    </h2>

                    <Divider />

                    <ThemeSelector />
                </Card>

                <form action={Logout}>
                    <Button
                        variant="danger"
                        type="submit"
                    >
                        Log Out
                    </Button>
                </form>
            </main>
        </ThemeBackground>
    );
};

export default ProfilePage;
