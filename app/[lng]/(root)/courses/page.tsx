import TopBar from '@/components/shared/top-bar'
// import AllCourses from './_components/all-courses'
// import { getAllCourses } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'
import { Metadata } from 'next'
import { getCollectionAll } from '@/actions/collection.action'
import AllCoursesBanner from './_components/all-courses-banner'

export const metadata: Metadata = {
	title: 'Praktikum | Barcha kurslar',
	description:
		"Platformamizda mavjud bo'lgan barcha kurslar ro'yxati. O'zingizga mos kursni toping va o'rganishni boshlang!",
}
async function Page({ searchParams }: SearchParamsProps) {
	// const resultJSON = await getAllCourses({
	// 	searchQuery: searchParams.q,
	// 	filter: searchParams.filter,
	// 	page: searchParams.page ? +searchParams.page : 1,
	// })

	// const result = JSON.parse(JSON.stringify(resultJSON))

	const rawResult = await getCollectionAll()
	console.log(rawResult)

	// Map rawResult to match Props type for AllCoursesBanner
	const result = rawResult.map((item: any) => ({
		title: item.title || '',
		previewImage: item.previewImage || '',
		instructor: item.instructor || '',
		result: item.result || {},
		_id: item._id,
	}))

	return (
		<>
			<TopBar label='allCourses' description='allCourseDescription' />
			{/* <AllCourses result={result} /> */}
			<AllCoursesBanner result={result} />
		</>
	)
}

export default Page
