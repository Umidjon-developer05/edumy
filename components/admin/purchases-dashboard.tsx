'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import PurchaseCard from './purchase-card'
import type { Purchase } from '@/types/purchase'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface PurchasesDashboardProps {
	purchases: Purchase[]
	onActivatePurchase?: (orderId: string) => Promise<void>
}

export default function PurchasesDashboard({
	purchases,
	onActivatePurchase,
}: PurchasesDashboardProps) {
	const [activeTab, setActiveTab] = useState('all')
	const [searchTerm, setSearchTerm] = useState('')

	// Categorize purchases by status
	const activePurchases = purchases.filter(p => p.status === 'active')
	const pendingPurchases = purchases.filter(p => p.status === 'pending')
	const completedPurchases = purchases.filter(p => p.status === 'completed')

	const getTabContent = (status: string) => {
		let filteredPurchases: Purchase[] = []

		switch (status) {
			case 'active':
				filteredPurchases = activePurchases
				break
			case 'pending':
				filteredPurchases = pendingPurchases
				break
			case 'completed':
				filteredPurchases = completedPurchases
				break
			default:
				filteredPurchases = purchases
		}

		// Filter by search term (orderId)
		if (searchTerm.trim()) {
			filteredPurchases = filteredPurchases.filter(purchase =>
				purchase.orderId.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		if (filteredPurchases.length === 0) {
			return (
				<div className='py-12 text-center'>
					<div className='text-muted-foreground'>
						{searchTerm.trim()
							? `No purchases found with Order ID containing "${searchTerm}"`
							: `No ${status === 'all' ? '' : status} purchases found`}
					</div>
				</div>
			)
		}

		return (
			<div className='grid gap-6'>
				{filteredPurchases.map(purchase => (
					<PurchaseCard
						key={purchase._id}
						purchase={purchase}
						onActivate={onActivatePurchase}
					/>
				))}
			</div>
		)
	}
    
	return (
		<div className='space-y-6'>
			{/* Search Input */}
			<div className='relative'>
				<Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2  text-muted-foreground' />
				<Input
					placeholder='Search by Order ID...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='pl-10'
				/>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
				<TabsList className='grid w-full grid-cols-4'>
					<TabsTrigger value='all' className='flex items-center space-x-2'>
						<span>All</span>
						<Badge variant='secondary' className='ml-1'>
							{purchases.length}
						</Badge>
					</TabsTrigger>
					<TabsTrigger value='active' className='flex items-center space-x-2'>
						<span>Active</span>
						<Badge
							variant='secondary'
							className='ml-1 bg-green-100 text-green-800'
						>
							{activePurchases.length}
						</Badge>
					</TabsTrigger>
					<TabsTrigger value='pending' className='flex items-center space-x-2'>
						<span>Pending</span>
						<Badge
							variant='secondary'
							className='ml-1 bg-yellow-100 text-yellow-800'
						>
							{pendingPurchases.length}
						</Badge>
					</TabsTrigger>
					<TabsTrigger
						value='completed'
						className='flex items-center space-x-2'
					>
						<span>Completed</span>
						<Badge
							variant='secondary'
							className='ml-1 bg-blue-100 text-blue-800'
						>
							{completedPurchases.length}
						</Badge>
					</TabsTrigger>
				</TabsList>

				<TabsContent value='all' className='mt-6'>
					{getTabContent('all')}
				</TabsContent>

				<TabsContent value='active' className='mt-6'>
					{getTabContent('active')}
				</TabsContent>

				<TabsContent value='pending' className='mt-6'>
					{getTabContent('pending')}
				</TabsContent>

				<TabsContent value='completed' className='mt-6'>
					{getTabContent('completed')}
				</TabsContent>
			</Tabs>
		</div>
	)
}
