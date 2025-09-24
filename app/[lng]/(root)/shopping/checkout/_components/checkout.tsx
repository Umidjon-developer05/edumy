"use client";

import {
  createPendingPurchase,
  updateCoursePurchase,
} from "@/actions/purchase.action";
import { sendNotification } from "@/actions/notification.action";
import FillLoading from "@/components/shared/fill-loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/use-cart";
import useTranslate from "@/hooks/use-translate";
import { addressSchema } from "@/lib/validation";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

interface Props {
  coupon: number;
}

function Checkout({ coupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { totalPrice, taxes, carts, clearCart } = useCart();
  const t = useTranslate();
  const { userId } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      zip: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    if (!userId) return;

    setLoading(true);
    setError("");

    try {
      const orderData = {
        userId,
        courses: carts.map((course) => course._id),
        totalAmount: totalPrice(coupon) + taxes(),
        couponDiscount: coupon,
        shippingAddress: values,
        isActive: false, // Set as inactive purchase
      };

      // Create pending purchase
      const orderId = await createPendingPurchase(orderData);
      const data = {
        userId,
        courseId: carts.map((course) => course._id),
      };
      await updateCoursePurchase(data);
      // Send notifications
      for (const course of carts) {
        await sendNotification(course.instructor.clerkId, "messageCourseSold");
      }
      await sendNotification(userId, "messageCoursePurchased");

      // Redirect to success page
      router.push(`/shopping/success?orderId=${orderId}`);
      setTimeout(clearCart, 1000);
    } catch (error) {
      setLoading(false);
      const result = error as Error;
      setError(result.message);
    }
  };

  return (
    <>
      {loading && <FillLoading />}
      {error && (
        <Alert variant="destructive" className="mb-4 mt-2">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-6">
        <h2 className="mb-4 font-space-grotesk text-lg font-bold">
          {t("shippingAddress")}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fullName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("enterFullName")}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("address")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("enterAddress")}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("city")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enterCity")}
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("zipCode")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enterZipCode")}
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="group w-full"
              disabled={loading}
              size="lg"
            >
              <span>
                {t("placeOrder")}{" "}
                {(totalPrice(coupon) + taxes()).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default Checkout;
