import { getPurchaseByOrderId } from "@/actions/purchase.action";
import type { SearchParamsProps } from "@/app.types";
import TopBar from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { translation } from "@/i18n/server";
import { format } from "date-fns";
import { GaugeCircle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Praktikum | Muvaqqiyatli buyurtma",
  description: "Buyurtma muvaffaqiyatli qabul qilindi!",
};

interface Props extends SearchParamsProps {
  params: { lng: string };
}

async function Page({ params, searchParams }: Props) {
  const purchase = await getPurchaseByOrderId(searchParams.orderId!);
  const { t } = await translation(params.lng);

  return (
    <>
      <TopBar label={t("checkout")} extra={t("successfully")} />
      <div className="container mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center space-y-2">
        <Image
          src={"/assets/success.png"}
          alt="success"
          width={200}
          height={200}
        />
        <div className="text-center">
          <h1 className="font-space-grotesk text-2xl font-bold">
            {t("orderReceived")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("orderPendingApproval")}
          </p>
          <Button className="mt-4" rounded={"full"} size={"lg"} asChild>
            <Link href={"/profile"}>
              <span>{t("dashboard")}</span>
              <GaugeCircle className="ml-1 size-4" />
            </Link>
          </Button>
          <div className="mt-4 grid w-full grid-cols-4 gap-4 rounded-lg border border-dashed border-primary p-8 max-md:grid-cols-1">
            <div className="flex flex-col items-start">
              <h2 className="font-space-grotesk font-bold">{t("order")}</h2>
              <p className="text-sm font-bold text-primary">
                #{purchase.orderId}
              </p>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="font-space-grotesk font-bold">{t("date")}</h2>
              <p className="text-sm font-bold text-primary">
                {format(new Date(purchase.createdAt), "dd/MM/yyyy")}
              </p>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="font-space-grotesk font-bold">{t("totals")}</h2>
              <p className="text-sm font-bold text-primary">
                {purchase.totalAmount.toLocaleString("uz-UZ", {
                  style: "currency",
                  currency: "UZS",
                })}
              </p>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="font-space-grotesk font-bold">{t("status")}</h2>
              <p className="text-sm font-bold text-orange-500">
                {t("pending")}
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-orange-500 bg-orange-50 p-4">
            <p className="text-sm text-orange-700">
              {t("orderPendingMessage")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
