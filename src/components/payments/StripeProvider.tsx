"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ReactNode } from "react";

// Initialize Stripe with the public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface StripeProviderProps {
    children: ReactNode;
    clientSecret?: string;
    amount?: number;
}

export function StripeProvider({ children, clientSecret, amount }: StripeProviderProps) {
    if (!clientSecret) {
        return <>{children}</>;
    }

    const options = {
        clientSecret,
        appearance: {
            theme: "stripe" as const,
            variables: {
                colorPrimary: "#0f766e", // teal-700
                colorBackground: "#ffffff",
                colorText: "#1f2937",
                colorDanger: "#ef4444",
                fontFamily: "Inter, system-ui, sans-serif",
                spacingUnit: "4px",
                borderRadius: "12px",
            },
            rules: {
                ".Input": {
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                    padding: "12px 16px",
                },
                ".Input:focus": {
                    border: "2px solid #0f766e",
                    boxShadow: "0 0 0 1px #0f766e20",
                },
                ".Label": {
                    fontWeight: "500",
                    marginBottom: "8px",
                },
            },
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
}

export { stripePromise };
