"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, LogOut, Menu, X, Package } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session } = useSession();
  const { getItemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Package className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">Gadget Shop</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="transition-colors hover:text-primary">
            Products
          </Link>
          {session && (
            <Link href="/orders" className="transition-colors hover:text-primary">
              Orders
            </Link>
          )}
          {session?.user?.role === "admin" && (
            <Link href="/admin" className="transition-colors hover:text-primary">
              Admin
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Cart */}
          <Link href="/cart" className="relative p-2 hover:bg-accent rounded-md transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {session ? (
            <div className="hidden md:flex items-center space-x-2">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
              <span className="text-sm max-w-[120px] truncate">{session.user?.name}</span>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign in
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t bg-background transition-all",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <nav className="flex flex-col space-y-2 p-4">
          <Link href="/" className="py-2 hover:text-primary" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/products" className="py-2 hover:text-primary" onClick={() => setMobileOpen(false)}>
            Products
          </Link>
          {session && (
            <Link href="/orders" className="py-2 hover:text-primary" onClick={() => setMobileOpen(false)}>
              Orders
            </Link>
          )}
          {session ? (
            <button
              className="py-2 text-left hover:text-primary flex items-center gap-2"
              onClick={() => {
                signOut();
                setMobileOpen(false);
              }}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
