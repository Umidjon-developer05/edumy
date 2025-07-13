import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import type { LngParams } from '@/types'
import CheckoutElement from './_components/checkout-element'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Praktikum | Checkout',
	description: 'Kurslarni sotib olish sahifasi',
}

async function Page({ params }: LngParams) {
	const { t } = await translation(params.lng)

	return (
		<>
			<TopBar label={'shoppingCart'} extra={t('checkout')} />
			<CheckoutElement />
		</>
	)
}

export default Page
