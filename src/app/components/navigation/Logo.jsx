import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            className="
                inline-flex
                items-center
                gap-2
                transition-all
            "
            style={{
                color: "var(--text-primary)",

                fontFamily: "var(--font-title)",
                fontSize: "var(--font-size-2xl)",
                fontWeight: "var(--font-weight-bold)",

                transitionDuration: "var(--motion-fast)",
                transitionTimingFunction:
                    "var(--motion-easing)",
            }}
        >
            Between the Lines
        </Link>
    );
}