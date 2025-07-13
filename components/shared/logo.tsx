import Image from 'next/image'
import Link from 'next/link'

function Logo() {
	return (
		<Link href={'/'} className='flex items-center gap-2'>
			<Image src={'/logo.svg'} alt='logo' width={50} height={50} />
			<h1 className='font-space-grotesk text-2xl font-bold sm:text-4xl'>
				Edumy
			</h1>
		</Link>
	)
}

export default Logo
