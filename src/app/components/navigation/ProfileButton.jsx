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
                backgroundColor:
                    "var(--surface)",

                border:
                    "var(--border-subtle) solid var(--border)",

                color:
                    "var(--text-primary)",

                fontFamily:
                    "var(--font-body)",

                fontSize:
                    "var(--font-size-base)",

                fontWeight:
                    "var(--font-weight-semibold)",

                boxShadow:
                    "var(--shadow-button)",

                transitionDuration:
                    "var(--motion-fast)",

                transitionTimingFunction:
                    "var(--motion-easing-standard)",
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
