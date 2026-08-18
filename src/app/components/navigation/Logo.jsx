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
                color:
                    "var(--text-primary)",

                fontFamily:
                    "var(--font-heading)",

                fontSize:
                    "var(--font-size-2xl)",

                fontWeight:
                    "var(--font-weight-bold)",

                lineHeight:
                    "var(--line-height-heading)",

                letterSpacing:
                    "var(--letter-spacing-heading)",

                transitionDuration:
                    "var(--motion-fast)",

                transitionTimingFunction:
                    "var(--motion-easing-standard)",
            }}
        >
            Between the Lines
        </Link>
    );
}