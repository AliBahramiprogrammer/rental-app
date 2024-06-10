import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apiClient from "../api-client";
import { userActions } from "../redux/state";
import { categories } from "../data";
import Loader from "./Loader";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import { userType } from "../../../backend/src/shared/types"
import "../styles/Listings.scss"

export type listingType = {
    _id: string;
    creator: userType;
    listingPhotoUrls: string[];
    city: string;
    province: string;
    country: string;
    category: string;
    type: string;
    price: number;
    booking: boolean;
};

const Listings = () => {
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState("All");

    const listings = useSelector((state: any) => state.listings);

    const { data, isLoading } = useQuery({
        queryKey: ["fetchListings", selectedCategory],
        queryFn: () => apiClient.getListingByCategory(selectedCategory),
    });

    useEffect(() => {
        dispatch(userActions.setListings({ listings: data }));
    }, [data]);

    return (
        <>
            <div className="category-list">
                {categories?.map((category, index) => (
                    <div
                        className={`category ${
                            category.label === selectedCategory
                                ? "selected"
                                : ""
                        }`}
                        key={index}
                        onClick={() => setSelectedCategory(category.label)}
                    >
                        <div className="category_icon">{category.icon}</div>
                        <p>{category.label}</p>
                    </div>
                ))}
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="listings">
                    {listings?.map(
                        ({
                            _id,
                            creator,
                            listingPhotoUrls,
                            city,
                            province,
                            country,
                            category,
                            type,
                            price,
                            booking = false,
                        }: listingType) => (
                            <ListingCard
                                listingId={_id}
                                creator={creator}
                                listingPhotoUrls={listingPhotoUrls}
                                city={city}
                                province={province}
                                country={country}
                                category={category}
                                type={type}
                                price={price}
                                booking={booking}
                            />
                        )
                    )}
                </div>
            )}
        </>
    );
};

export default Listings;
