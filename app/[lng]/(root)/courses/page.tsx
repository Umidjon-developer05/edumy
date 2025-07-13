import TopBar from '@/components/shared/top-bar'
import { Metadata } from 'next'
import { getCollectionAll } from '@/actions/collection.action'
import AllCoursesBanner from './_components/all-courses-banner'

export const metadata: Metadata = {
	title: 'Praktikum | Barcha kurslar',
	description:
		"Platformamizda mavjud bo'lgan barcha kurslar ro'yxati. O'zingizga mos kursni toping va o'rganishni boshlang!",
}
async function Page() {
	const rawResult = await getCollectionAll()
	console.log(rawResult)

	const result = rawResult.map((item: any) => ({
		title: item.title || '',
		previewImage: item.previewImage || '',
		instructor: item.instructor || '',
		result: item.result || {},
		_id: item._id.toString(),
	}))

	return (
		<>
			<TopBar label='allCourses' description='allCourseDescription' />
			<AllCoursesBanner result={result} />
		</>
	)
}

export default Page
