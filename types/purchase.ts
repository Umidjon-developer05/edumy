export interface User {
	_id: string
	fullName: string
	email: string
	picture: string
}

export interface Course {
	_id: string
	title: string
	currentPrice: number
	previewImage: string
}

export interface ShippingAddress {
	fullName: string
	address: string
	city: string
	zip: string
}

export interface Purchase {
	_id: string
	orderId: string
	user: User
	course: Course
	totalAmount: number
	couponDiscount: number
	shippingAddress: ShippingAddress
	isActive: boolean
	status: 'active' | 'pending' | 'completed'
	createdAt: string
	updatedAt: string
	__v: number
}
