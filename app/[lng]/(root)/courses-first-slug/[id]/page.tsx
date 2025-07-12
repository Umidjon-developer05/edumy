import { getAllCourses } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'
import React from 'react'
import AllCourses from '../../courses/_components/all-courses'

async function page({ searchParams }: SearchParamsProps) {
	const resultJSON = await getAllCourses({
		searchQuery: searchParams.q,
		filter: searchParams.filter,
		page: searchParams.page ? +searchParams.page : 1,
		instructor: searchParams.id,
	})

	const result = JSON.parse(JSON.stringify(resultJSON))
	console.log(result)
	return <div>
        <AllCourses result={result} />
    </div>
}

export default page
