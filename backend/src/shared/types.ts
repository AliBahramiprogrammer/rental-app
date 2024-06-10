export type userType = {
    _id: string,
    firstName: string
    lastName: string,
    email: string,
    password?: string,
    profileImagePath: string,
    tripList?: string[],
    wishList?: listingType[],
    propertyList?: string[],
    reservationList?: string[],
    createdAt: Date,
    updatedAt: Date,
}

export type listingType = {
    _id: string,
    creator: userType | string;
    category: string;
    type: string;
    streetAddress: string;
    aptSuite: string;
    city: string;
    province: string;
    country: string;
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    bathroomCount: number;
    amenity: string[];
    listingPhotoUrls: string[];
    title: string;
    description: string;
    highlight: string;
    highlightDesc: string;
    price: number;
}