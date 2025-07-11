'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
	collection: {
		_id: string
		title: string
		previewImage: string
	}
}

export default function CollectionCard({ collection }: Props) {
	const safeImage =
		collection.previewImage?.startsWith('http') &&
		collection.previewImage.length > 10
			? collection.previewImage.replace(/\s+/g, '')
			: '/fallback.jpg'
	return (
		<Card className='max-w-[300px] overflow-hidden rounded-2xl border bg-white shadow-xl dark:bg-secondary'>
			<div className='relative h-52 w-full'>
				<Image
					src={safeImage}
					alt={collection.title}
					fill
					className='object-cover'
				/>
			</div>
			<CardHeader>
				<CardTitle className='text-lg font-semibold'>
					{collection.title?.toLocaleUpperCase()}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex justify-end  '>
				<Link href={`/instructor/collections/${collection._id}`}>
					<Button size='sm' className='mt-2 text-white'>
						View Courses
					</Button>
				</Link>
			</CardContent>
		</Card>
	)
}
