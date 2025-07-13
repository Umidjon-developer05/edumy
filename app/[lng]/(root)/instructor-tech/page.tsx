import React from 'react'
import Instructor from './_components/instructor'
import { getAdminInstructors } from '@/actions/user.action'

async function instructorTech() {
	const instructorData = await getAdminInstructors({ pageSize: 4 })
	return (
		<div>
			<Instructor
				instructors={JSON.parse(JSON.stringify(instructorData.instructors))}
			/>
		</div>
	)
}

export default instructorTech
