import { getAllPurchases, activatePurchase } from '@/actions/purchase.action'

import Header from '@/components/shared/header'
import PurchasesDashboard from '@/components/admin/purchases-dashboard'
import { revalidatePath } from 'next/cache'

async function Student() {
	const GetAllPurchase = await getAllPurchases()

	const handleActivatePurchase = async (orderId: string) => {
		'use server'

		try {
			await activatePurchase(orderId, '/student')
			revalidatePath('/student')
		} catch (error) {
			console.error('Failed to activate purchase:', error)
			throw error
		}
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<Header
				title='All Students'
				description='Here are all the students and their purchases'
			/>

			<div className='mt-8'>
				<PurchasesDashboard
					purchases={GetAllPurchase}
					onActivatePurchase={handleActivatePurchase}
				/>
			</div>
		</div>
	)
}

export default Student
