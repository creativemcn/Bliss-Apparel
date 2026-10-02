"use client";

import { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { createOrderAfterPayment } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { ShippingAddress } from "@/types";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface CheckoutFormProps {
  clientSecret: string;
  paymentIntentId: string;
  total: number;
}

export default function CheckoutForm({
  clientSecret,
  paymentIntentId,
  total,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { items, clearCart, getSubtotal } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Basic validation
    if (
      !address.fullName ||
      !address.email ||
      !address.phone ||
      !address.addressLine1 ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      toast.error("Please fill in all required shipping fields");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          receipt_email: address.email,
          shipping: {
            name: address.fullName,
            phone: address.phone,
            address: {
              line1: address.addressLine1,
              line2: address.addressLine2 || undefined,
              city: address.city,
              state: address.state,
              postal_code: address.postalCode,
              country: "US",
            },
          },
        },
        redirect: "if_required", // Stay on page if possible
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        toast.error(error.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // 2. Create the order in our database + send email
        const result = await createOrderAfterPayment({
          shippingAddress: address,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
          })),
          paymentIntentId: paymentIntent.id,
          total,
        });

        if (result.success) {
          clearCart();
          toast.success("Order placed successfully!");
          router.push(`/checkout/success?order_id=${result.orderId}`);
        } else {
          // Payment succeeded but order creation failed – rare
          toast.error(result.error || "Order creation failed. Contact support.");
          setErrorMessage(result.error || "Order creation failed");
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getSubtotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Address */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
            <Input
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email *</label>
            <Input
              name="email"
              type="email"
              value={address.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone *</label>
            <Input
              name="phone"
              type="tel"
              value={address.phone}
              onChange={handleChange}
              required
              placeholder="+1 555 000 0000"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Address Line 1 *</label>
            <Input
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleChange}
              required
              placeholder="123 Main St"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Address Line 2</label>
            <Input
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleChange}
              placeholder="Apt, suite, etc. (optional)"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">City *</label>
            <Input
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              placeholder="New York"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">State *</label>
            <Input
              name="state"
              value={address.state}
              onChange={handleChange}
              required
              placeholder="NY"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Postal Code *</label>
            <Input
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              required
              placeholder="10001"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Country *</label>
            <Input
              name="country"
              value={address.country}
              onChange={handleChange}
              required
              disabled
            />
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Payment</h2>
        <div className="border rounded-lg p-4 bg-card">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>
        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
      </section>

      {/* Order Summary (mobile) */}
      <section className="lg:hidden border rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span>Total</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </section>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay ${formatPrice(total)}`
        )}
      </Button>
    </form>
  );
}
