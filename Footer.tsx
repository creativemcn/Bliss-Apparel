import Link from "next/link";
import { Package } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Gadget Shop</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for the latest tech gadgets and electronics.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products?category=Smartphones" className="hover:text-primary">Smartphones</Link></li>
              <li><Link href="/products?category=Laptops" className="hover:text-primary">Laptops</Link></li>
              <li><Link href="/products?category=Headphones" className="hover:text-primary">Headphones</Link></li>
              <li><Link href="/products?category=Gaming" className="hover:text-primary">Gaming</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/orders" className="hover:text-primary">Track Order</Link></li>
              <li><a href="#" className="hover:text-primary">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary">Returns</a></li>
              <li><a href="#" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gadget Shop. All rights reserved. Built for AI Coding Bootcamp.
        </div>
      </div>
    </footer>
  );
}
