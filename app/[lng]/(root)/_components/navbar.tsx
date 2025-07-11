'use client'

import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { LogIn, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import GlobalSearch from './global-search'
import LanguageDropdown from '@/components/shared/language-dropdown'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import UserBox from '@/components/shared/user-box'
import useTranslate from '@/hooks/use-translate'
import { useCart } from '@/hooks/use-cart'
import Notification from '@/components/shared/notification'
import { SidebarTrigger } from '@/components/ui/sidebar'

function Navbar() {
	const t = useTranslate()
	const { cartsLength } = useCart()

	return (
		<div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-background p-5 transition-[width,height] ease-linear'>
			<div className='container mx-auto flex h-full max-w-7xl items-center justify-between '>
				<div className='flex items-center gap-4'>
					<SidebarTrigger className='-ml-1' />
					<Logo />
				</div>

				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-2 md:border-r md:pr-3'>
						<div className='hidden gap-1 md:flex'>
							<GlobalSearch />
							<LanguageDropdown />
							<Notification />
							<Button
								size={'icon'}
								variant={cartsLength() ? 'secondary' : 'ghost'}
								asChild
								className='relative'
								aria-label='shopping-cart'
							>
								<Link href={'/shopping/cart'} aria-label='shopping-cart'>
									<ShoppingCart />
									{cartsLength() ? (
										<div className='absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-destructive'>
											{cartsLength()}
										</div>
									) : null}
								</Link>
							</Button>
						</div>
						{/* <Mobile /> */}
						<ModeToggle />
					</div>
					<SignedIn>
						<UserBox />
					</SignedIn>
					<SignedOut>
						<SignInButton mode='modal'>
							<Button size={'lg'} className='hidden rounded-full md:flex'>
								{t('logIn')}
							</Button>
						</SignInButton>
						<SignInButton mode='modal'>
							<Button size={'icon'} variant={'ghost'} className='md:hidden'>
								<LogIn />
							</Button>
						</SignInButton>
					</SignedOut>
				</div>
			</div>
		</div>
	)
}

export default Navbar
