'use client'

import { ICourse } from '@/app.types'
import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'
import Link from 'next/link'
import { Progress } from '../ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import React, { useState } from 'react'

interface Props {
	course: ICourse
	progress: number
	_id: unknown
	isActive: boolean // Add this property
	orderId: string // Add this property
}

function ProgressCourseCard({ course, progress, isActive, orderId }: Props) {
	const t = useTranslate()
	const [open, setOpen] = useState(false)
	const handleClick = (e: React.MouseEvent) => {
		if (!isActive) {
			e.preventDefault()
			setOpen(true)
		}
	}

	return (
		<>
			<Link href={`/dashboard/${course._id}`} onClick={handleClick}>
				<div className='cursor-pointer rounded-md border bg-background p-2 transition hover:shadow-lg'>
					<div className='relative h-40 w-full'>
						<Image
							src={course.previewImage}
							alt={course.title}
							fill
							className='rounded-md object-cover'
						/>
						<div className='absolute bottom-0 right-0 flex items-center gap-2 rounded-tl-lg bg-blue-500/50 px-2 py-1'>
							<p className='font-space-grotesk text-sm font-bold text-white'>
								{course.category}
							</p>
						</div>
						<div>
							{isActive ? (
								<div className='absolute right-0 top-0 flex items-center gap-2 rounded-tr-lg bg-green-500/50 px-2 py-1'>
									<p className='font-space-grotesk text-sm font-bold text-white'>
										{t('active')}
									</p>
								</div>
							) : (
								<div className='absolute right-0 top-0 flex items-center gap-2 rounded-tr-lg bg-red-500/50 px-2 py-1'>
									<p className='font-space-grotesk text-sm font-bold text-white'>
										{t('inactive')}
									</p>
								</div>
							)}
						</div>
					</div>
					<h2 className='mt-2 line-clamp-1 font-space-grotesk font-bold'>
						{course.title}
					</h2>
					<Progress value={progress} className='mt-2 h-3' />
					<div className='mt-2 text-sm font-bold opacity-50'>
						{progress ? progress.toFixed(0) : 0}% {t('completed')}
					</div>
				</div>
			</Link>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='text-center'>
					<DialogHeader>
						<DialogTitle>To‘lov talab qilinadi</DialogTitle>
					</DialogHeader>
					<p className='text-sm opacity-80'>
						Ushbu kursga kirish uchun avval to‘lovni amalga oshiring.
					</p>
					<p className='mt-2 text-sm font-bold'>
						📦 Order ID: <span className='text-blue-600'>{orderId}</span>
					</p>

					<p className='mt-2 text-sm font-bold'>
						👤 admin:{' '}
						<span className='text-blue-600'>
							<a href='https://t.me/Edumy_admin' target='_blank'>
								@Edumy_admin
							</a>
						</span>
					</p>
					<Button className='mt-4 w-full' onClick={() => setOpen(false)}>
						Yopish
					</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default ProgressCourseCard
