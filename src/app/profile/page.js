import ProfilePictureMenu from "../components/profile/ProfilePictureMenu";
import Link from "next/link";

import getProfile from "@/lib/profile/getProfile";

import Logout from "../actions/Logout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Divider from "../components/ui/Divider";
import ThemeSelector from "../components/ThemeSelector";

import { getInitials } from "@/lib/initials/getInitials";

const ProfilePage = async () => {
    const profile = await getProfile();

    const initials = getInitials(
        profile.displayName
    );

    return (
        <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 p-8">

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
                            "var(--textMuted)",
                    }}
                >
                    Your reading journey, all in one place.
                </p>

            </header>

            <Card className="flex flex-col gap-6 p-8">

                <div className="flex items-center gap-6">

                    <ProfilePictureMenu
                        profilePicture={
                            profile.profilePicture
                        }
                        displayName={
                            profile.displayName
                        }
                        initials={initials}
                    />

                    <div className="flex flex-col gap-1">

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
                                    "var(--textMuted)",
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
                                    "var(--textMuted)",
                            }}
                        >
                            Signed in with{" "}
                            {profile.provider === "GOOGLE"
                                ? "Google"
                                : "Email & Password"}
                        </p>

                    </div>

                </div>

            </Card>

            <Card className="flex flex-col gap-6 p-8">

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
                    }}
                >
                    Reading Statistics
                </h2>

                <Divider />

                <div className="grid gap-4 md:grid-cols-2">

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
                            }}
                        >
                            🎨 Doodles:{" "}
                            {profile.stats.doodles}
                        </span>
                    </Card>

                </div>

            </Card>

            <Card className="flex flex-col gap-6 p-8">

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
                    }}
                >
                    Appearance
                </h2>

                <Divider />

                <ThemeSelector />

            </Card>

            <form action={Logout}>
                <div className="self-start">

                    <Button
                        variant="danger"
                        type="submit"
                    >
                        Log Out
                    </Button>

                </div>
            </form>

        </main>
    );
};

export default ProfilePage;
