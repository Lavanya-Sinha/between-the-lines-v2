import Link from "next/link";

import getProfile from "@/lib/profile/getProfile";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";

import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";

import ProfilePictureEditor from "@/app/components/profile/ProfilePictureEditor";

const ProfilePicturePage = async () => {
    const profile = await getProfile();

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
                    max-w-3xl
                    flex-col
                    gap-8
                    p-6
                    sm:p-8
                "
            >
                <Link
                    href="/profile"
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
                    ← Back to Profile
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
                        Profile Picture
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
                        Choose a picture that
                        represents you.
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
                        Change your picture
                    </h2>

                    <Divider />

                    <ProfilePictureEditor
                        profilePicture={
                            profile.profilePicture
                        }
                        displayName={
                            profile.displayName
                        }
                    />
                </Card>
            </main>
        </ThemeBackground>
    );
};

export default ProfilePicturePage;