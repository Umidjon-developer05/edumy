import { getStudentCourse } from '@/actions/course.action'
import ProgressCourseCard from '@/components/cards/progress-course.card'
import Header from '@/components/shared/header'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { auth } from '@clerk/nextjs'
import React from 'react'

async function Page({ params }: LngParams) {
	const { userId } = auth()
	const { t } = await translation(params.lng)
	const data = await getStudentCourse(userId!)
	return (
		<>
			<Header title={t('myCourses')} description={t('myCoursesDescription')} />

			<div className='mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1'>
				{data.allCourses.map((item, idx) => (
					<ProgressCourseCard
						key={idx}
						course={item.course}
						progress={item.progress}
						_id={item._id}
						isActive={item.isActive}
						orderId={item.orderId}
					/>
				))}
			</div>
		</>
	)
}

export default Page
