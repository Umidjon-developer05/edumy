import { Schema, model, models } from 'mongoose'

const PurchaseSchema = new Schema(
	{
		orderId: { type: String, required: true, unique: true },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		course: { type: Schema.Types.ObjectId, ref: 'Course' },
		totalAmount: { type: Number, required: true },
		couponDiscount: { type: Number, default: 0 },
		shippingAddress: {
			fullName: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			zip: { type: String, required: true },
		},
		isActive: { type: Boolean, default: false },
		status: {
			type: String,
			enum: ['pending', 'completed', 'cancelled'],
			default: 'pending',
		},
		createdAt: { type: Date, default: Date.now },
		activatedAt: { type: Date },
	},
	{ timestamps: true }
)

const Purchase = models.Purchase || model('Purchase', PurchaseSchema)
export default Purchase
