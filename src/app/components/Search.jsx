"use client";

import { useEffect, useState } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

import useDebounce from "../hooks/useDebounce";
import Input from "./ui/Input";

const Search = ({
    placeholder = "Search your library...",
    defaultValue = "",
}) => {
    const [query, setQuery] =
        useState(defaultValue);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const debouncedQuery = useDebounce(
        query,
        300
    );

    useEffect(() => {
        const params = new URLSearchParams(
            searchParams
        );

        const currentSearch =
            searchParams.get("search") ?? "";

        if (
            currentSearch === debouncedQuery
        ) {
            return;
        }

        if (debouncedQuery) {
            params.set(
                "search",
                debouncedQuery
            );
        } else {
            params.delete("search");
        }

        const queryString =
            params.toString();

        router.replace(
            queryString
                ? `${pathname}?${queryString}`
                : pathname
        );
    }, [
        debouncedQuery,
        pathname,
        router,
        searchParams,
    ]);

    return (
        <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(event) =>
                setQuery(event.target.value)
            }
        />
    );
};

export default Search;
