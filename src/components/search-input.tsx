"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchTerm(query);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
      params.delete("currentPage");
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mb-5">
      <Input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="pl-10 pr-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
      {searchTerm && (
        <Button
          onClick={clearSearch}
          variant="ghost"
          size="icon"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <X className="w-5 h-5 " />
        </Button>
      )}
    </div>
  );
};
