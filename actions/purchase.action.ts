'use server'

import { connectToDatabase } from '@/lib/mongoose'
import Purchase from '@/database/purchase.model'
import { generateNumericId } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import User from '@/database/user.model'

interface PurchaseData {
	userId: string
	courses: string[]
	totalAmount: number
	couponDiscount: number
	shippingAddress: {
		fullName: string
		address: string
		city: string
		zip: string
	}
	isActive: boolean
}

export const createPendingPurchase = async (data: PurchaseData) => {
	try {
		await connectToDatabase()

		const orderId = generateNumericId()
		const userId = await User.findOne({ clerkId: data.userId })
		console.log(userId)
		await Purchase.create({
			orderId,
			user: userId?._id,
			course: data.courses,
			totalAmount: data.totalAmount,
			couponDiscount: data.couponDiscount,
			shippingAddress: data.shippingAddress,
			isActive: data.isActive,
			status: 'pending',
			createdAt: new Date(),
		})

		return orderId
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

export const activatePurchase = async (orderId: string, path?: string) => {
	try {
		await connectToDatabase()

		await Purchase.findOneAndUpdate(
			{ orderId },
			{
				isActive: true,
				status: 'completed',
				activatedAt: new Date(),
			}
		)

		if (path) {
			revalidatePath(path)
		}
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

export const getPendingPurchases = async (userId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId: userId })
		const purchases = await Purchase.find({
			user,
			isActive: false,
			status: 'pending',
		}).populate('course')

		return JSON.parse(JSON.stringify(purchases))
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

export const getPurchaseByOrderId = async (orderId: string) => {
	try {
		await connectToDatabase()

		const purchase = await Purchase.findOne({ orderId }).populate('course')

		return JSON.parse(JSON.stringify(purchase))
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}
