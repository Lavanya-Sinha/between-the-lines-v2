import Image from "next/image";
import Link from "next/link";

import { getInitials } from "@/lib/initials/getInitials";

export default function ProfileButton({
    profilePicture,
    displayName,
}) {
    const initials = getInitials(displayName);

    return (
        <Link
            href="/profile"
            className="
                relative
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                transition-all
            "
            style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",

                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-semibold)",

                boxShadow: "var(--shadow-sm)",

                transitionDuration:
                    "var(--motion-fast)",

                transitionTimingFunction:
                    "var(--motion-easing)",
            }}
        >
            {profilePicture ? (
                <Image
                    src={profilePicture}
                    alt={displayName}
                    fill
                    sizes="48px"
                    className="rounded-full object-cover"
                />
            ) : (
                initials || "BT"
            )}
        </Link>
    );
}
