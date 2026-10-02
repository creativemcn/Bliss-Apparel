"use client";

import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    if (product.stock <= 0) {
      toast.error("Out of stock");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image_url: product.image_url,
      stock: product.stock,
      quantity: qty,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border rounded-md">
        <button
          className="px-3 py-2 hover:bg-accent"
          onClick={() => setQty(Math.max(1, qty - 1))}
          disabled={qty <= 1}
        >
          −
        </button>
        <span className="px-4 py-2 min-w-[3rem] text-center">{qty}</span>
        <button
          className="px-3 py-2 hover:bg-accent"
          onClick={() => setQty(Math.min(product.stock, qty + 1))}
          disabled={qty >= product.stock}
        >
          +
        </button>
      </div>
      <Button
        size="lg"
        className="flex-1"
        onClick={handleAdd}
        disabled={product.stock <= 0}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Add to Cart
      </Button>
    </div>
  );
}
