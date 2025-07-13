import type { Metadata } from 'next'
import { Roboto, Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import '../globals.css'
import { ChildProps } from '@/types'
import { ThemeProvider } from '@/components/providers/theme.provider'
import { languages } from '@/i18n/settings'
import { dir } from 'i18next'
import { ClerkProvider } from '@clerk/nextjs'
import { localization } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import NextTopLoader from 'nextjs-toploader'
import { GoogleAnalytics } from '@next/third-parties/google'

const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-roboto',
})

const spaceGrotesk = SpaceGrotesk({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-space-grotesk',
})

export async function generateStaticParams() {
	return languages.map(lng => ({ lng }))
}

export const metadata: Metadata = {
	metadataBase: new URL('https://Edemy.vercel.app'), // URL o‘sha qolgan, agar domenni ham o‘zgartirsang, shu yerga yozamiz
	title: 'Edemy Academy | Onlayn taʼlim platformasi',
	description:
		'Edemy Academy — bu zamonaviy onlayn taʼlim platformasi. Ingliz tili, rus tili, dasturlash, dizayn, 3D, UI/UX va boshqa kurslar bir joyda jamlangan.',
	authors: [{ name: 'Edemy Academy', url: 'https://Edemy.vercel.app' }],
	icons: { icon: '/logo.svg' },
	openGraph: {
		title: 'Edemy Academy | Onlayn taʼlim platformasi',
		description:
			'Edemy Academy — bu zamonaviy onlayn taʼlim platformasi. Ingliz tili, rus tili, dasturlash, dizayn, 3D, UI/UX va boshqa kurslar bir joyda jamlangan.',
		type: 'website',
		url: 'https://Edemy.vercel.app',
		locale: 'uz_UZ',
		images:
			'https://858yhjxxl1.ufs.sh/f/IyD1CkboyeparKtkXmnJRVd6oMTje2IK7nHhqv30aBUN4mrG',
		countryName: 'Uzbekistan',
		siteName: 'Edemy Academy',
		emails: 'umidjongafforov175@gmail.com',
	},
	keywords:
		'Edemy Academy, Onlayn kurslar, Ingliz tili, Rus tili, Dasturlash, NextJS, Dizayn, UI/UX, 3D Max, Zamonaviy taʼlim, Startup loyihalar, Kurslar platformasi',
}

interface Props extends ChildProps {
	params: { lng: string }
}

function RootLayout({ children, params: { lng } }: Props) {
	const local = localization(lng)

	return (
		<ClerkProvider localization={local}>
			<html lang={lng} dir={dir(lng)} suppressHydrationWarning>
				<body
					className={`${roboto.variable} ${spaceGrotesk.variable} custom-scrollbar overflow-x-hidden`}
					suppressHydrationWarning
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<NextTopLoader
							color='#3182CE'
							initialPosition={0.5}
							crawlSpeed={200}
							height={2}
							crawl={true}
							showSpinner={false}
							easing='ease'
							speed={200}
							shadow='0 0 10px #3182CE,0 0 5px #3182CE'
						/>
						<Toaster position='top-center' />
						<div>{children}</div>
					</ThemeProvider>
				</body>
				<GoogleAnalytics gaId='G-B8NJKXCBV4' />
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
