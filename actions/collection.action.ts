'use server'

import CourseCollection from '@/database/course-collection'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'

export async function createCollection(data: {
	title: string
	previewImage: string
	instructor: string // this is Clerk ID (user_xyz...)
}) {
	try {
		await connectToDatabase()

		const user = await User.findOne({ clerkId: data.instructor })
		if (!user) throw new Error('User not found')

		const newCollection = new CourseCollection({
			title: data.title,
			previewImage: data.previewImage,
			instructor: user._id, // ObjectId bo'ladi
		})

		await newCollection.save()

		// Optional: path revalidate
		// revalidatePath('/en/instructor/collections')

		return newCollection
	} catch (error) {
		console.error('CreateCollection error:', error)
		throw new Error('Something went wrong while creating collection!')
	}
}

export async function getCollectionById(clerkId: string) {
	try {
		await connectToDatabase()

		const user = await User.findOne({ clerkId })
		if (!user) throw new Error('User not found')

		const collections = await CourseCollection.find({
			instructor: user._id,
		})

		return collections
	} catch (error) {
		console.error('GetCollectionsByInstructor error:', error)
		throw new Error('Something went wrong while getting collections!')
	}
}

export async function getCollectionAll() {
	try {
		await connectToDatabase()
		const collections = await CourseCollection.find()
			.populate('instructor', 'fullName picture')
			.lean()
		return collections
	} catch (error) {
		console.error('GetCollectionsByInstructor error:', error)
		throw new Error('Something went wrong while getting collections!')
	}
}
