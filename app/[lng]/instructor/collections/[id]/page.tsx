import React from 'react'
import CourseFieldsForm from '@/components/forms/course-fields.form'
interface Params {
	params: { id: string }
}
function CollectionID({ params }: Params) {
	return (
		<div>
			<CourseFieldsForm id={params.id} />
		</div>
	)
}

export default CollectionID
