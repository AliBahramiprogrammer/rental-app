import axios from "axios";
import { LoginFormData } from "./pages/LoginPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type typeParams = {
    userId: string;
    listingId: string;
};

export const register = async (formData: FormData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/auth/register`,
            formData
        );
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const login = async (formData: LoginFormData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/auth/login`,
            JSON.stringify(formData),
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        if (!response.data) {
            throw new Error("No data returned from server");
        }

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const addMyListing = async (formData: FormData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/properties/create`,
            formData
        );
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const getListingByCategory = async (category: string) => {
    const URL =
        category === "All"
            ? `${API_BASE_URL}/api/properties`
            : `${API_BASE_URL}/api/properties?category=${category}`;
    try {
        const response = await axios.get(URL);
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const patchWishList = async ({ userId, listingId }: typeParams) => {
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/api/users/${userId}/${listingId}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const fetchListingById = async (listingId: string) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/properties/${listingId}`
        );
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const createBooking = async (bookingInfo: FormData) => {
    try {
        const respose = await axios.post(
            `${API_BASE_URL}/api/bookings/create`,
            bookingInfo,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!respose.data) {
            throw new Error("No data returned from server");
        }
        return respose.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const fetchBookingsById = async (userId: string) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/users/${userId}/trips`
        );
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const fetchPropertiesList = async (userId: string) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/users/${userId}/properties`
        );
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const fetchReservationList = async (userId: string) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/users/${userId}/reservations`
        );
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const fetchListingBySearch = async (search: string) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/properties/search/${search}`
        );

        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
};
