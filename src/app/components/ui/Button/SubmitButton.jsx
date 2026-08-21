"use client";

import { useFormStatus } from "react-dom";
import Button from "./button";

export default function SubmitButton({
    children,
    loadingText,
    ...props
}) {
    const { pending } = useFormStatus();

    return (
        <Button
            {...props}
            type="submit"
            loading={pending}
        >
            {pending ? loadingText ?? children : children}
        </Button>
    );
}