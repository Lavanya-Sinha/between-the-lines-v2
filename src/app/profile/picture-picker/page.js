import Link from "next/link";

import getProfile from "@/lib/profile/getProfile";

import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";
import ProfilePictureEditor from "@/app/components/profile/ProfilePictureEditor";

const ProfilePicturePage = async () => {
    const profile = await getProfile();

    return (
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 p-8">

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
                            "var(--textMuted)",
                    }}
                >
                    Choose a picture that represents you.
                </p>

            </header>

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
    );
};

export default ProfilePicturePage;