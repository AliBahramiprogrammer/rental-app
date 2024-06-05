export type userType = {
    _id: string,
    firstName: string
    lastName: string,
    email: string,
    password?: string,
    profileImagePath: string,
    tripList?: string[],
    wishList?: string[],
    propertyList?: string[],
    reservationList?: string[],
    createdAt: Date,
    updatedAt: Date,
}