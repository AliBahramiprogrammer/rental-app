import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { userActions } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { listingType } from "../components/Listings";
import "../styles/List.scss";
import "react-loading-skeleton/dist/skeleton.css";
import ListingCardSkeleton from "../components/ListingCardSkaleton";
const CategoryPage = () => {
    const { category } = useParams();
    const dispatch = useDispatch();

    const listings = useSelector((state: any) => state.listings);

    const { data, isLoading } = useQuery({
        queryKey: ["fetchListings", category],
        queryFn: () => apiClient.getListingByCategory(category!),
    });

    useEffect(() => {
        dispatch(userActions.setListings({ listings: data }));
    }, [data]);

    return (
        <>
            <Navbar />
            <h1 className="title-list">{category} listings</h1>
            <div className="list">
                {isLoading ? (
                    <ListingCardSkeleton cards={3} />
                ) : (
                    listings?.map(
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
                    )
                )}
            </div>
            <Footer />
        </>
    );
};

export default CategoryPage;
