'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
	CheckCircle,
	Clock,
	MapPin,
	Mail,
	BookOpen,
	DollarSign,
} from 'lucide-react'
import type { Purchase } from '@/types/purchase'
import Image from 'next/image'

interface PurchaseCardProps {
	purchase: Purchase
	onActivate?: (orderId: string) => Promise<void>
}

export default function PurchaseCard({
	purchase,
	onActivate,
}: PurchaseCardProps) {
	const [isActivating, setIsActivating] = useState(false)

	const handleActivate = async () => {
		if (!onActivate) return

		setIsActivating(true)
		try {
			await onActivate(purchase.orderId)
		} catch (error) {
			console.error('Failed to activate purchase:', error)
		} finally {
			setIsActivating(false)
		}
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active':
				return 'bg-green-100 text-green-800 border-green-200'
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200'
			case 'completed':
				return 'bg-blue-100 text-blue-800 border-blue-200'
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200'
		}
	}

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'active':
				return <CheckCircle className='size-4' />
			case 'pending':
				return <Clock className='size-4' />
			default:
				return <CheckCircle className='size-4' />
		}
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('uz-UZ', {
			style: 'currency',
			currency: 'UZS',
		}).format(price)
	}

	return (
		<Card className='w-full transition-shadow duration-200 hover:shadow-lg'>
			<CardHeader className='pb-4'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center space-x-4'>
						<Avatar className='size-12'>
							<AvatarImage
								src={purchase.user.picture || '/placeholder.svg'}
								alt={purchase.user.fullName}
							/>
							<AvatarFallback>
								{purchase.user.fullName
									.split(' ')
									.map(n => n[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className='text-lg font-semibold'>
								{purchase.user.fullName}
							</h3>
							<div className='mt-1 flex items-center text-sm text-muted-foreground'>
								<Mail className='mr-1 size-4' />
								{purchase.user.email}
							</div>
						</div>
					</div>
					<div className='flex flex-col items-end space-y-2'>
						<Badge className={getStatusColor(purchase.status)}>
							{getStatusIcon(purchase.status)}
							<span className='ml-1 capitalize'>{purchase.status}</span>
						</Badge>
						<span className='text-sm text-muted-foreground'>
							#{purchase.orderId}
						</span>
					</div>
				</div>
			</CardHeader>

			<CardContent className='space-y-4'>
				{/* Course Information */}
				<div className='flex items-center space-x-4 rounded-lg bg-muted/50 p-4'>
					<Image
						src={purchase?.course?.previewImage || ''}
						alt={purchase?.course?.title}
						width={1000}
						height={1000}
						className='size-16 rounded-lg object-cover'
					/>
					<div className='flex-1'>
						<div className='flex items-center space-x-2'>
							<BookOpen className='size-4 text-muted-foreground' />
							<h4 className='font-medium'>{purchase?.course?.title}</h4>
						</div>
						<div className='mt-1 flex items-center space-x-2'>
							<DollarSign className='size-4 text-muted-foreground' />
							<span className='text-sm text-muted-foreground'>
								Course Price: {formatPrice(purchase?.course?.currentPrice)}
							</span>
						</div>
					</div>
				</div>

				<Separator />

				{/* Purchase Details */}
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<div className='space-y-2'>
						<h5 className='text-sm font-medium'>Purchase Details</h5>
						<div className='space-y-1 text-sm text-muted-foreground'>
							<div>
								Total Amount:{' '}
								<span className='font-medium text-foreground'>
									{formatPrice(purchase.totalAmount)}
								</span>
							</div>
							<div>
								Coupon Discount:{' '}
								<span className='font-medium text-foreground'>
									{formatPrice(purchase.couponDiscount)}
								</span>
							</div>
							<div>
								Created:{' '}
								<span className='font-medium text-foreground'>
									{formatDate(purchase.createdAt)}
								</span>
							</div>
						</div>
					</div>

					<div className='space-y-2'>
						<h5 className='flex items-center text-sm font-medium'>
							<MapPin className='mr-1 size-4' />
							Shipping Address
						</h5>
						<div className='space-y-1 text-sm text-muted-foreground'>
							<div className='font-medium text-foreground'>
								{purchase?.shippingAddress.fullName}
							</div>
							<div>{purchase?.shippingAddress.address}</div>
							<div>
								{purchase.shippingAddress.city}, {purchase.shippingAddress.zip}
							</div>
						</div>
					</div>
				</div>

				{/* Action Button */}
				{purchase.status === 'pending' && onActivate && (
					<div className='border-t pt-4'>
						<Button
							onClick={handleActivate}
							disabled={isActivating}
							className='w-full'
						>
							{isActivating ? 'Activating...' : 'Activate Purchase'}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
