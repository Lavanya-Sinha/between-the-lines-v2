"use client";

import Image from "next/image";
import { useState } from "react";

import ChangeProfilePicture from "@/app/actions/profile/ChangeProfilePicture";

import Button from "../ui/Button";

import { getInitials } from "@/lib/initials/getInitials";

const ProfilePictureEditor = ({
    profilePicture,
    displayName,
}) => {
    const initials = getInitials(displayName);

    const [preview, setPreview] =
        useState(profilePicture);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const previewUrl =
            URL.createObjectURL(file);

        setPreview(previewUrl);
    };

    return (
        <form
            action={ChangeProfilePicture}
            className="flex flex-col items-center gap-6"
        >

            <div
                className="
                    relative
                    flex
                    h-40
                    w-40
                    items-center
                    justify-center
                    overflow-hidden
                     rounded-full
                "
                style={{
                    backgroundColor:
                        "var(--surfaceSecondary)",

                    border:
                        "1px solid var(--border)",

                    color:
                        "var(--text-primary)",

                    fontFamily:
                        "var(--font-body)",

                    fontSize:
                        "var(--font-size-2xl)",

                    fontWeight:
                        "var(--font-weight-semibold)",

                    boxShadow:
                        "var(--shadow-md)",
                }}
            >
                {preview ? (
                    <Image
                        src={preview}
                        alt={displayName}
                        fill
                        className="object-cover"
                        sizes="160px"
                        unoptimized={
                            preview.startsWith(
                                "blob:"
                            )
                        }
                    />
                ) : (
                    initials || "BT"
                )}
            </div>

            <label
                htmlFor="profile-picture"
                className="cursor-pointer"
            >
                <span
                    className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-xl
                        border
                        px-4
                        py-3
                        transition-all
                        duration-300
                    "
                    style={{
                        backgroundColor:
                            "var(--surface)",

                        borderColor:
                            "var(--border)",

                        color:
                            "var(--text-primary)",

                        boxShadow:
                            "var(--shadow-sm)",
                    }}
                >
                    Choose Image
                </span>

                <input
                    id="profile-picture"
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    onChange={
                        handleFileChange
                    }
                    className="sr-only"
                />
            </label>

            <Button type="submit">
                Save Picture
            </Button>

        </form>
    );
};

export default ProfilePictureEditor;