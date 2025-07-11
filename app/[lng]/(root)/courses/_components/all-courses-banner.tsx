'use client'
import CourseCardBanner from '@/components/cards/course.card-banner'
import NoResult from '@/components/shared/no-result'

import useTranslate from '@/hooks/use-translate'
import { IInstructor } from '@/types'

interface Props {
	_id: string
	title: string
	previewImage: string
	instructor: IInstructor[]
	result: any[] // Add the result property, adjust type as needed
}

function AllCoursesBanner({ result }: { result: Props[] }) {
	const t = useTranslate()

	return (
		<div className='container mx-auto mt-12 max-w-6xl'>
			<div className='flex items-center justify-between max-md:flex-col max-md:items-start max-md:space-y-2'></div>

			<div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{result.map((course: any, index: any) => (
					<CourseCardBanner key={index} {...course} />
				))}
			</div>

			{result.length === 0 && (
				<NoResult
					title={t('noCourses')}
					description={t('noCourseDescription')}
				/>
			)}
		</div>
	)
}

export default AllCoursesBanner
