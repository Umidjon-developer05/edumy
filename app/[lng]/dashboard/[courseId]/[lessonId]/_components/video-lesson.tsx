'use client'

import { ILesson } from '@/app.types'
import useTranslate from '@/hooks/use-translate'
import { useAuth } from '@clerk/nextjs'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Vimeo from '@vimeo/player'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { completeLesson, getNextLesson } from '@/actions/lesson.action'
import { toast } from 'sonner'

interface Props {
	lesson: ILesson
}

// Video tipini aniqlaymiz
function getVideoType(url: string) {
	if (/^\d+$/.test(url)) return 'vimeo' // faqat raqam bo‘lsa — vimeo ID
	if (/youtu\.?be|youtube\.com/.test(url)) return 'youtube'
	if (/firebasestorage\.googleapis\.com/.test(url)) return 'firebase'
	if (/uploadthing/.test(url)) return 'uploadthing'
	return 'direct'
}

// YouTube ID ni olish
function getYouTubeID(url: string): string | null {
	const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^"&?/\\s]{11})/)
	return match ? match[1] : null
}

function VideoLesson({ lesson }: Props) {
	const [isLoading, setIsLoading] = useState(true)
	const videoType = getVideoType(lesson.videoUrl)
	const [hasNextLesson, setHasNextLesson] = useState(true)

	const vimeoPlayerRef = useRef<HTMLDivElement | null>(null)
	const { courseId } = useParams()
	const router = useRouter()
	const pathname = usePathname()
	const { userId } = useAuth()
	const t = useTranslate()

	useEffect(() => {
		if (videoType === 'vimeo' && vimeoPlayerRef.current) {
			const player = new Vimeo(vimeoPlayerRef.current, {
				id: +lesson.videoUrl,
				responsive: true,
				autoplay: true,
			})

			player.ready().then(() => setIsLoading(false))
			player.on('ended', onEnd)
		} else {
			setIsLoading(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lesson, pathname])

	const onEnd = async () => {
		setIsLoading(true)

		try {
			const [next] = await Promise.all([
				getNextLesson(lesson._id, `${courseId}`),
				completeLesson(lesson._id, userId!, pathname),
			])

			if (next?.lessonId) {
				router.push(
					`/dashboard/${courseId}/${next.lessonId}?s=${next.sectionId}`
				)
			} else {
				setHasNextLesson(false) // keyingi dars yo‘q
				toast.success(t('successfully'))
			}
		} catch (err) {
			console.error(err)
			toast.error(t('error'))
		} finally {
			setIsLoading(false)
		}
	}

	const renderVideo = () => {
		switch (videoType) {
			case 'vimeo':
				return (
					<div
						ref={vimeoPlayerRef}
						className='aspect-video w-full rounded-md'
					/>
				)
			case 'youtube':
				return (
					<iframe
						src={`https://www.youtube.com/embed/${getYouTubeID(
							lesson.videoUrl
						)}`}
						allowFullScreen
						className='aspect-video w-full rounded-md'
					/>
				)
			case 'firebase':
			case 'uploadthing':
			case 'direct':
				return (
					<video
						src={lesson.videoUrl}
						controls
						autoPlay
						muted
						className='aspect-video w-full rounded-md'
						onEnded={onEnd}
					/>
				)
			default:
				return <div>Video format not supported</div>
		}
	}

	return (
		<>
			{isLoading && (
				<div className='relative h-[20vh] w-full rounded-md bg-secondary sm:h-[30] md:h-[50vh] lg:h-[75vh]'>
					<Skeleton className='absolute right-0 top-0 flex size-full items-center justify-center rounded-md bg-slate-500/20'>
						<Loader2 className='size-6 animate-spin text-primary' />
					</Skeleton>
				</div>
			)}

			<div
				className={cn('max-md:sticky top-[10vh] z-50', isLoading && 'hidden')}
			>
				{renderVideo()}
			</div>

			<div className='mt-4 flex flex-col gap-2 rounded-md bg-gradient-to-t from-background to-secondary p-4 md:flex-row md:items-center md:justify-between lg:p-6'>
				<h2 className='mt-4 font-space-grotesk text-2xl font-bold'>
					{lesson.title}
				</h2>
				{hasNextLesson ? (
					<Button disabled={isLoading} onClick={onEnd}>
						<span className='pr-2'>{t('completeLesson')}</span>
						<CheckCircle size={18} />
					</Button>
				) : (
					<p className='text-sm text-muted-foreground'>{t('noMoreLessons')}</p>
				)}
			</div>
		</>
	)
}

export default VideoLesson
