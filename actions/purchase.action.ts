"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Purchase from "@/database/purchase.model";
import { generateNumericId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";
import Course from "@/database/course.model";

interface PurchaseData {
  userId: string;
  courses: string[];
  totalAmount: number;
  couponDiscount: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    zip: string;
  };
  isActive: boolean;
}
interface updateCoursePurchase {
  userId: string;
  courseId: string[];
}

export const createPendingPurchase = async (data: PurchaseData) => {
  try {
    await connectToDatabase();

    const orderId = generateNumericId();
    const userId = await User.findOne({ clerkId: data.userId });
    await Purchase.create({
      orderId,
      user: userId?._id,
      course: data.courses,
      totalAmount: data.totalAmount,
      couponDiscount: data.couponDiscount,
      shippingAddress: data.shippingAddress,
      isActive: data.isActive,
      status: "pending",
      createdAt: new Date(),
    });

    return orderId;
  } catch (error) {
    const result = error as Error;
    throw new Error(result.message);
  }
};
export const updateCoursePurchase = async (data: updateCoursePurchase) => {
  try {
    await connectToDatabase();

    // Foydalanuvchini clerkId bo‘yicha topish
    const user = await User.findOne({ clerkId: data.userId });
    if (!user) {
      throw new Error("User not found");
    }

    // Kursga foydalanuvchini qo‘shish (takrorlanmas qo‘shish uchun $addToSet)
    const course = await Course.findByIdAndUpdate(
      data.courseId,
      {
        $addToSet: { purchases: user._id }, // yoki $push ishlatsa ham bo‘ladi
      },
      { new: true }
    );

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  } catch (error) {
    const result = error as Error;
    throw new Error(result.message);
  }
};

export const activatePurchase = async (orderId: string, path?: string) => {
  try {
    await connectToDatabase();

    await Purchase.findOneAndUpdate(
      { orderId },
      {
        isActive: true,
        status: "completed",
        activatedAt: new Date(),
      }
    );

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    const result = error as Error;
    throw new Error(result.message);
  }
};

export const getPendingPurchases = async (userId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const purchases = await Purchase.find({
      user,
      isActive: false,
      status: "pending",
    }).populate("course");

    return JSON.parse(JSON.stringify(purchases));
  } catch (error) {
    const result = error as Error;
    throw new Error(result.message);
  }
};
export const getAllPurchases = async () => {
  try {
    await connectToDatabase();

    const purchases = await Purchase.find()
      .populate("course", "title previewImage currentPrice _id ")
      .populate("user", "fullName _id picture email")
      .lean();

    return JSON.parse(JSON.stringify(purchases));
  } catch (error) {
    const result = error as Error;
    throw new Error(result.message);
  }
};

export const getPurchaseByOrderId = async (orderId: string) => {
  try {
    await connectToDatabase();

    const purchase = await Purchase.findOne({ orderId }).populate("course");

    return JSON.parse(JSON.stringify(purchase));
  } catch (error) {
    const result = error as Error;
    throw new Error(result.message);
  }
};
