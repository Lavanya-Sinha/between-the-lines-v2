"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import requireUser from "@/lib/auth/requireUser";

import SaveFile from "@/lib/uploads/SaveFile";
import DeleteFile from "@/lib/uploads/DeleteFile";

const ChangeProfilePicture = async (formData) => {
    const user = await requireUser();

    const file = formData.get("profile_picture");

    if (!(file instanceof File) || file.size === 0) {
        throw new Error("Please select an image.");
    }

    if (!file.type.startsWith("image/")) {
        throw new Error(
            "Profile picture must be an image."
        );
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        throw new Error(
            "Profile picture must be smaller than 5MB."
        );
    }

    const uploadedFile = await SaveFile(
        file,
        "between-the-lines/profile-pictures"
    );

    try {
        await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                profile_picture:
                    uploadedFile.fileUrl,

                profile_picture_public_id:
                    uploadedFile.publicId,
            },
        });

        if (user.profile_picture_public_id) {
            await DeleteFile(
                user.profile_picture_public_id,
                "image"
            );
        }
    } catch (error) {
        await DeleteFile(
            uploadedFile.publicId,
            "image"
        );

        throw error;
    }
revalidatePath("/profile");
revalidatePath("/", "layout");
    redirect("/profile");
};

export default ChangeProfilePicture;