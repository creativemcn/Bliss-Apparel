"use server";

import { auth } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { sendOrderConfirmationEmail } from "@/lib/mailgun";
import { ShippingAddress, OrderItem, Product } from "@/types";
import { revalidatePath } from "next/cache";

interface CreateOrderInput {
  shippingAddress: ShippingAddress;
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  paymentIntentId: string;
  total: number;
}

export async function createOrderAfterPayment(input: CreateOrderInput) {
  const session = await auth();
  const supabase = createServiceClient();

  try {
    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: session?.user?.id || null,
        total: input.total,
        status: "processing",
        shipping_address: input.shippingAddress,
        payment_intent_id: input.paymentIntentId,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order creation failed:", orderError);
      return { success: false, error: "Failed to create order" };
    }

    // 2. Create order items + decrease stock
    const orderItems = input.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items failed:", itemsError);
      // Optionally rollback order here
      return { success: false, error: "Failed to create order items" };
    }

    // 3. Decrease stock for each product
    for (const item of input.items) {
      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.productId)
        .single();

      if (product) {
        await supabase
          .from("products")
          .update({ stock: Math.max(0, product.stock - item.quantity) })
          .eq("id", item.productId);
      }
    }

    // 4. Fetch full order items with product details for email
    const { data: fullItems } = await supabase
      .from("order_items")
      .select(`
        *,
        product:products(*)
      `)
      .eq("order_id", order.id);

    // 5. Send confirmation email
    if (fullItems && fullItems.length > 0) {
      await sendOrderConfirmationEmail({
        order: {
          ...order,
          shipping_address: input.shippingAddress,
        },
        items: fullItems as (OrderItem & { product: Product })[],
      });
    }

    revalidatePath("/orders");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("createOrderAfterPayment error:", error);
    return { success: false, error: "Unexpected error creating order" };
  }
}

export async function getUserOrders() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUserOrders error:", error);
    return [];
  }
  return data || [];
}

export async function getOrderById(orderId: string) {
  const session = await auth();
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .eq("id", orderId)
    .single();

  if (error || !data) return null;

  // Only allow owner or admin
  if (
    data.user_id !== session?.user?.id &&
    session?.user?.role !== "admin"
  ) {
    return null;
  }

  return data;
}
