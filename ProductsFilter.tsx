"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { Search } from "lucide-react";

interface ProductsFilterProps {
  categories: Category[];
}

export default function ProductsFilter({ categories }: ProductsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const currentCategory = searchParams.get("category") || "";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: search || null });
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Search */}
      <form onSubmit={handleSearch} className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <div className="flex gap-2">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" size="icon" variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => updateParams({ category: null })}
            className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
              !currentCategory
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateParams({ category: cat })}
              className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                currentCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Price Range</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() =>
            updateParams({
              minPrice: minPrice || null,
              maxPrice: maxPrice || null,
            })
          }
        >
          Apply Price
        </Button>
      </div>

      {/* Clear */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push("/products")}
      >
        Clear Filters
      </Button>
    </div>
  );
}
