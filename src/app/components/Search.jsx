"use client"

import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Search = ({ placeholder, defaultValue }) => {
  const [query, setQuery] = useState(defaultValue?? "")
  const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();
const debouncedQuery = useDebounce(query, 300);

useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentSearch = searchParams.get("search") ?? "";

if (currentSearch === debouncedQuery) {
    return;
}

    if (debouncedQuery) {
        params.set("search", debouncedQuery);
    } else {
        params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
}, [debouncedQuery]);
  return (
    <div>
     <input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    </div>
  );
};
export default Search;
