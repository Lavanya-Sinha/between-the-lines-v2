"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePictureMenu({
  profilePicture,
  displayName,
  initials,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  return (
    <div className="relative">
      {/* Profile picture */}
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Profile picture options"
        aria-expanded={isOpen}
       className="
    relative
    flex
    h-20
    w-20
    shrink-0
    items-center
    justify-center
    overflow-hidden
    rounded-full
    cursor-pointer
    transition-all
    duration-300
    hover:scale-105
"
        style={{
          backgroundColor: "var(--surfaceSecondary)",

          border: "1px solid var(--border)",

          color: "var(--text-primary)",

          fontFamily: "var(--font-body)",

          fontSize: "var(--font-size-xl)",

          fontWeight: "var(--font-weight-semibold)",

          boxShadow: "var(--shadow-sm)",

          transitionDuration: "var(--motion-fast)",

          transitionTimingFunction: "var(--motion-easing)",
        }}
      >
        {profilePicture ? (
          <Image
            src={profilePicture}
            alt={displayName}
            fill
            className="rounded-full object-cover"
            sizes="80px"
          />
        ) : (
          initials || "BT"
        )}
      </button>

      {/* Options */}
      {isOpen && (
        <div
          className="
                        absolute
                        left-0
                        top-full
                        z-20
                        mt-3
                        flex
                        min-w-40
                        flex-col
                        overflow-hidden
                    "
          style={{
            backgroundColor: "var(--surface)",

            border: "1px solid var(--border)",

            borderRadius: "var(--radius-lg)",

            boxShadow: "var(--shadow-md)",

            fontFamily: "var(--font-body)",

            transition: "var(--motion-fast)",
          }}
        >
          {profilePicture && (
            <button
              type="button"
              onClick={() => {
                setIsViewing(true);
                setIsOpen(false);
              }}
              className="
                                px-4
                                py-3
                                text-left
                                cursor-pointer
                                transition-all
                                duration-300
                                hover:bg-[var(--surfaceSecondary)]
                            "
            >
              View
            </button>
          )}

          <Link
            href="/profile/picture-picker"
            onClick={() => setIsOpen(false)}
            className="
                            px-4
                            py-3
                            transition-all
                            duration-300
                            hover:bg-[var(--surfaceSecondary)]
                        "
          >
            {profilePicture ? "Change" : "Add Picture"}
          </Link>
        </div>
      )}

      {/* View picture */}
      {isViewing && profilePicture && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            p-8
        "
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--background) 80%, transparent)",
          }}
        >
          <button
            type="button"
            aria-label="Close profile picture"
            onClick={() => setIsViewing(false)}
            className="
                absolute
                inset-0
                cursor-default
            "
          />

          <div
            className="
        relative
        z-10
        h-72
        w-72
        rounded-full
        overflow-hidden
    "
            style={{
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <Image
              src={profilePicture}
              alt={displayName}
              fill
              sizes="320px"
              className="rounded-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsViewing(false)}
            aria-label="Close profile picture"
            className="
                absolute
                right-6
                top-6
                z-20
                cursor-pointer
                text-2xl
            "
            style={{
              color: "var(--text-primary)",
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
