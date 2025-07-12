import { getAllCourses } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'
import React from 'react'
import AllCourses from '../../courses/_components/all-courses'

type Props = SearchParamsProps & {
	params: { id: string }
}

async function page({ searchParams, params }: Props) {
	const resultJSON = await getAllCourses({
		searchQuery: searchParams.q,
		filter: searchParams.filter,
		page: searchParams.page ? +searchParams.page : 1,
		instructor: params.id, // ✅ bu joy to‘g‘ri ishlaydi
	})

	const result = JSON.parse(JSON.stringify(resultJSON))

	return (
		<div>
			<AllCourses result={result} />
		</div>
	)
}

export default page
