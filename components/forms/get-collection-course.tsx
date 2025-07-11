import CollectionCard from './collection-card'
import { getCollectionById } from '@/actions/collection.action'
import { auth } from '@clerk/nextjs/server'

export default async function CollectionPage() {
	const { userId } = auth()
	console.log('userId', userId)
	const collection = await getCollectionById(userId || '')
	console.log('collection', collection)
	if (!collection) return <div>Collection not found</div>

	return (
		<div className=' mt-10 max-w-xl p-2'>
			{collection?.map((col: any) => (
				<CollectionCard key={col._id} collection={col} />
			))}
		</div>
	)
}
