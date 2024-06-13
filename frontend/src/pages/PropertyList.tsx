import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useEffect } from "react";
import { userActions } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { listingType } from "../components/Listings";
import "../styles/List.scss";
const PropertyList = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state?.user);
    const propertyList = user?.propertyList;

    const { data: property, isLoading } = useQuery({
        queryKey: ["fetchProperties", user?._id],
        queryFn: () => apiClient.fetchPropertiesList(user?._id),
    });
    console.log(property);
    useEffect(() => {
        dispatch(userActions.setPropertyList({ propertyList: property }));
    }, [property]);

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <h1 className="title-list">Your Property List</h1>
            <div className="list">
                {propertyList?.map(
                    (
                        {
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
                        }: listingType,
                        index:string
                    ) => (
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
                            key={index}
                        />
                    )
                )}
            </div>

            <Footer />
        </>
    );
};

export default PropertyList;
