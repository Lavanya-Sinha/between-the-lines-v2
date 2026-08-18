"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import requireUser from "@/lib/auth/requireUser";

const validThemes = [
    "autumn",
    "forest",
    "rain",
    "diary",
    "night",
];

const UpdateTheme = async (theme) => {
    const user = await requireUser();

    if (!validThemes.includes(theme)) {
        throw new Error("Invalid theme.");
    }

    await prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            theme,
        },
    });

    revalidatePath("/", "layout");
};

export default UpdateTheme;