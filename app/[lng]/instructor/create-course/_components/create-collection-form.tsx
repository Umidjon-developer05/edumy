'use client'

import { useState, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { storage } from '@/lib/firebase'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { createCollection } from '@/actions/collection.action'
import { useUser } from '@clerk/nextjs'

function CreateCollectionForm() {
	const { register, handleSubmit, reset } = useForm()
	const [previewImage, setPreviewImage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useUser()
	const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = async e => {
			const result = e.target?.result as string
			const refs = ref(storage, `collections/${uuidv4()}`)
			const upload = uploadString(refs, result, 'data_url')
				.then(() => getDownloadURL(refs))
				.then(url => setPreviewImage(url))
				.catch(err => {
					console.error(err)
					toast.error('Upload error: ' + err.message)
				})

			toast.promise(upload, {
				loading: 'Uploading...',
				success: 'Uploaded!',
				error: 'Upload failed',
			})
		}
	}

	const onSubmit = async (data: any) => {
		if (!previewImage) return toast.error('Please upload an image.')
		if (!user?.id) return toast.error('User not found. Please log in.')
		setIsLoading(true)

		const promise = createCollection({
			title: data.title,
			previewImage,
			instructor: user.id,
		})
			.then(() => {
				reset()
				setPreviewImage('')
				toast.success('Collection created!')
			})
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Saving...',
			success: 'Saved!',
			error: 'Error!',
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<Input
				placeholder='e.g. Dasturlash, Ingliz tili'
				{...register('title')}
				disabled={isLoading}
			/>
			<Input type='file' onChange={onUpload} disabled={isLoading} />
			<Button type='submit' disabled={isLoading}>
				Create Collection
			</Button>
		</form>
	)
}

export default CreateCollectionForm
