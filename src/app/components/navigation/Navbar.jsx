import Divider from "../ui/Divider";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";

import getCurrentUser from "@/lib/auth/auth";

export default async function Navbar() {
    const user = await getCurrentUser();

    return (
        <header
            className="
                sticky
                top-0
                z-50
                transition-all
            "
            style={{
                backgroundColor:
                    "var(--background)",

                color:
                    "var(--text-primary)",

                boxShadow:
                    "var(--shadow-card)",

                transitionDuration:
                    "var(--motion-normal)",

                transitionTimingFunction:
                    "var(--motion-easing-standard)",

                backdropFilter:
                    "blur(12px)",
            }}
        >
            <nav
                className="
                    mx-auto
                    flex
                    max-w-7xl
                    items-center
                    justify-between
                    gap-6
                    px-8
                    py-5
                "
            >
                <Logo />

                {user && (
                    <ProfileButton
                        displayName={
                            user.display_name
                        }
                        profilePicture={
                            user.profile_picture
                        }
                    />
                )}
            </nav>

            <Divider />
        </header>
    );
}