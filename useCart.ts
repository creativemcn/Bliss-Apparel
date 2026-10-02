"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore, CartStoreItem } from "@/types";

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: Math.min(i.quantity + (item.quantity || 1), i.stock) }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                productId: item.productId,
                name: item.name,
                price: item.price,
                image_url: item.image_url,
                quantity: item.quantity || 1,
                stock: item.stock,
              },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.min(quantity, i.stock) }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "gadget-shop-cart",
    }
  )
);
