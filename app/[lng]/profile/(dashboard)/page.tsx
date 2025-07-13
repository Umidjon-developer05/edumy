import { getStudentCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import ProgressCourseCard from '@/components/cards/progress-course.card'
import StatisticsCard from '@/components/cards/statistics.card'
import Header from '@/components/shared/header'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { auth } from '@clerk/nextjs'
import { MonitorPlay } from 'lucide-react'
import { GrMoney } from 'react-icons/gr'
interface ItemType {
	course: ICourse
	progress: number
	_id: unknown
	isActive: boolean // Add this property
	orderId: string // Add this property
}
async function Page({ params }: LngParams) {
	const { t } = await translation(params.lng)
	const { userId } = auth()
	const data = await getStudentCourse(userId!)
	console.log(data)
	return (
		<>
			<Header title={t('dashboard')} description={t('welcomeDashboard')} />

			<div className='mt-4 grid grid-cols-2 gap-4 max-md:grid-cols-1'>
				<StatisticsCard
					label={t('myCourses')}
					value={`${data.allCourses.length}`}
					Icon={MonitorPlay}
				/>
				<StatisticsCard
					label={t('expenses')}
					value={`${data.expenses.toLocaleString('uz-UZ', {
						style: 'currency',
						currency: 'UZS',
					})}`}
					Icon={GrMoney}
				/>
			</div>

			<Header title={t('myCourses')} description={t('myCoursesDescription')} />

			<div className='mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1'>
				{data.allCourses
					.map((item: ItemType) => (
						<ProgressCourseCard
							key={String(item._id)}
							course={item.course}
							progress={item.progress}
							_id={item._id}
							isActive={item.isActive}
							orderId={item.orderId}
						/>
					))
					.splice(0, 3)}
			</div>
		</>
	)
}

export default Page
