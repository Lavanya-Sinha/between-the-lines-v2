"use client";

import { CldImage } from "next-cloudinary";

export default function CloudinaryImage(props) {
    return (
        <CldImage
            {...props}
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
        />
    );
}