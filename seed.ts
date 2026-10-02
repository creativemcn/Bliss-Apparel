/**
 * Seed script for Gadget Shop products
 * Run with: npx tsx scripts/seed.ts
 * Requires SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const products = [
  {
    name: "iPhone 15 Pro Max",
    description: "Apple's flagship smartphone with A17 Pro chip, titanium design, and advanced camera system.",
    price: 1199.0,
    category: "Smartphones",
    image_url: "https://images.unsplash.com/photo-1695048133142-1a204db4a5bb?w=800&q=80",
    stock: 45,
    featured: true,
    specs: { display: "6.7-inch OLED", chip: "A17 Pro", storage: "256GB", camera: "48MP" },
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android flagship with S Pen, 200MP camera, and AI-powered features.",
    price: 1299.0,
    category: "Smartphones",
    image_url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
    stock: 38,
    featured: true,
    specs: { display: "6.8-inch Dynamic AMOLED", chip: "Snapdragon 8 Gen 3", storage: "256GB", camera: "200MP" },
  },
  {
    name: "Google Pixel 8 Pro",
    description: "Best-in-class computational photography with Tensor G3 and 7 years of updates.",
    price: 999.0,
    category: "Smartphones",
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff31?w=800&q=80",
    stock: 52,
    featured: false,
    specs: { display: "6.7-inch LTPO OLED", chip: "Tensor G3", storage: "128GB", camera: "50MP" },
  },
  {
    name: "MacBook Pro 14-inch M3 Pro",
    description: "Powerful laptop for professionals with Liquid Retina XDR display and all-day battery.",
    price: 1999.0,
    category: "Laptops",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    stock: 28,
    featured: true,
    specs: { display: "14.2-inch Liquid Retina XDR", chip: "M3 Pro", ram: "18GB", storage: "512GB SSD" },
  },
  {
    name: "Dell XPS 15",
    description: "Stunning InfinityEdge display, powerful Intel Core processors, and premium build.",
    price: 1749.0,
    category: "Laptops",
    image_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
    stock: 22,
    featured: false,
    specs: { display: "15.6-inch OLED", chip: "Intel Core i7-13700H", ram: "16GB", storage: "512GB SSD" },
  },
  {
    name: "ASUS ROG Zephyrus G14",
    description: "Ultra-portable gaming laptop with AMD Ryzen and NVIDIA RTX graphics.",
    price: 1599.0,
    category: "Laptops",
    image_url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
    stock: 19,
    featured: true,
    specs: { display: "14-inch QHD 165Hz", chip: "AMD Ryzen 9 7940HS", gpu: "RTX 4060", storage: "1TB SSD" },
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation with exceptional sound quality and 30-hour battery.",
    price: 399.0,
    category: "Headphones",
    image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    stock: 67,
    featured: true,
    specs: { type: "Over-ear", anc: true, battery: "30 hours", connectivity: "Bluetooth 5.2" },
  },
  {
    name: "Apple AirPods Pro 2",
    description: "Active Noise Cancellation, Adaptive Audio, and personalized Spatial Audio.",
    price: 249.0,
    category: "Headphones",
    image_url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80",
    stock: 89,
    featured: true,
    specs: { type: "In-ear", anc: true, battery: "6 hours + case", chip: "H2" },
  },
  {
    name: "Bose QuietComfort Ultra",
    description: "Immersive audio with CustomTune technology and world-class noise cancellation.",
    price: 429.0,
    category: "Headphones",
    image_url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    stock: 41,
    featured: false,
    specs: { type: "Over-ear", anc: true, battery: "24 hours", spatial: true },
  },
  {
    name: "Apple Watch Ultra 2",
    description: "The most rugged and capable Apple Watch with precision dual-frequency GPS.",
    price: 799.0,
    category: "Smartwatches",
    image_url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80",
    stock: 34,
    featured: true,
    specs: { display: "49mm OLED", battery: "36 hours", material: "Titanium", water: "100m" },
  },
  {
    name: "Samsung Galaxy Watch 6 Classic",
    description: "Rotating bezel, advanced health tracking, and Wear OS flexibility.",
    price: 399.0,
    category: "Smartwatches",
    image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    stock: 48,
    featured: false,
    specs: { display: "47mm Super AMOLED", battery: "40 hours", material: "Stainless steel", os: "Wear OS" },
  },
  {
    name: "Garmin Fenix 7X",
    description: "Premium multisport GPS watch with solar charging and advanced training metrics.",
    price: 899.0,
    category: "Smartwatches",
    image_url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
    stock: 21,
    featured: false,
    specs: { display: "1.4-inch", battery: "28 days solar", gps: "Multi-band", material: "Titanium" },
  },
  {
    name: "Anker 737 Power Bank",
    description: "140W portable charger with digital display, powers laptops and phones simultaneously.",
    price: 149.0,
    category: "Accessories",
    image_url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    stock: 112,
    featured: false,
    specs: { capacity: "24000mAh", output: "140W", ports: "2x USB-C + USB-A", display: true },
  },
  {
    name: "Logitech MX Master 3S",
    description: "Precision wireless mouse with quiet clicks, MagSpeed scrolling, and multi-device support.",
    price: 99.0,
    category: "Accessories",
    image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    stock: 95,
    featured: false,
    specs: { dpi: "8000", battery: "70 days", connectivity: "Bluetooth + Logi Bolt", buttons: 7 },
  },
  {
    name: "Keychron Q1 Pro",
    description: "Wireless custom mechanical keyboard with QMK/VIA support and aluminum body.",
    price: 199.0,
    category: "Accessories",
    image_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    stock: 56,
    featured: true,
    specs: { layout: "75%", switches: "Gateron G Pro", connectivity: "2.4GHz + Bluetooth", material: "Aluminum" },
  },
  {
    name: "PlayStation 5 Slim",
    description: "Next-gen gaming console with ultra-high speed SSD, ray tracing, and DualSense controller.",
    price: 499.0,
    category: "Gaming",
    image_url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80",
    stock: 31,
    featured: true,
    specs: { storage: "1TB SSD", resolution: "4K 120Hz", rayTracing: true, disc: true },
  },
  {
    name: "Xbox Series X",
    description: "Most powerful Xbox ever with 12 teraflops, 4K gaming, and Game Pass Ultimate.",
    price: 499.0,
    category: "Gaming",
    image_url: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&q=80",
    stock: 27,
    featured: true,
    specs: { storage: "1TB SSD", resolution: "4K 120Hz", rayTracing: true, teraflops: 12 },
  },
  {
    name: "Nintendo Switch OLED",
    description: "Vibrant 7-inch OLED screen, enhanced audio, and 64GB storage for portable and docked play.",
    price: 349.0,
    category: "Gaming",
    image_url: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&q=80",
    stock: 64,
    featured: false,
    specs: { display: "7-inch OLED", storage: "64GB", battery: "4.5-9 hours", modes: "TV, Tabletop, Handheld" },
  },
  {
    name: "Razer BlackWidow V4 Pro",
    description: "Hot-swappable mechanical gaming keyboard with Command Dial and Razer Chroma RGB.",
    price: 229.0,
    category: "Gaming",
    image_url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80",
    stock: 43,
    featured: false,
    specs: { switches: "Razer Green", lighting: "Chroma RGB", wristRest: true, connectivity: "USB-C / Wireless" },
  },
  {
    name: "Meta Quest 3",
    description: "Mixed reality headset with full-color passthrough, high-resolution displays, and powerful Snapdragon chip.",
    price: 499.0,
    category: "Gaming",
    image_url: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80",
    stock: 36,
    featured: true,
    specs: { resolution: "2064x2208 per eye", chip: "Snapdragon XR2 Gen 2", storage: "128GB", tracking: "Inside-out" },
  },
];

async function seed() {
  console.log("🌱 Starting seed...");

  // Clear existing products (optional – comment out if you want to keep data)
  const { error: deleteError } = await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) {
    console.warn("Could not clear products (table may be empty):", deleteError.message);
  }

  const { data, error } = await supabase.from("products").insert(products).select();

  if (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data?.length || 0} products`);
}

seed();
