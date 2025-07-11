import { Schema, model, models } from 'mongoose'

const CourseCollectionSchema = new Schema(
	{
		title: String,
		previewImage: String,
		instructor: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
)

const CourseCollection =
	models.CourseCollection || model('CourseCollection', CourseCollectionSchema)
export default CourseCollection
