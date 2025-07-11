import { Separator } from '@/components/ui/separator'
import Header from '../../../../components/shared/header'
// import CourseFieldsForm from '@/components/forms/course-fields.form'
import CreateCollectionForm from './_components/create-collection-form'
import CollectionPage from '@/components/forms/get-collection-course'

function Page() {
	return (
		<>
			<CollectionPage />
			<Header
				title='Create a course'
				description='Fill in the details below to create a new course'
			/>

			<div className='mt-4 rounded-md bg-background p-4'>
				<h3 className='font-space-grotesk text-lg font-medium'>
					Basic information
				</h3>
				<Separator className='my-3' />

				<CreateCollectionForm />
				{/* <CourseFieldsForm /> */}
			</div>
		</>
	)
}

export default Page
