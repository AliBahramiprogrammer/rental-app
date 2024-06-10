import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/ListingDetails.scss";
import { facilities } from "../data";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ListingDetails = () => {
    const { listingId } = useParams();

    const { data: listing, isLoading } = useQuery({
        queryKey: ["fetchListing", listingId],
        queryFn: () => apiClient.fetchListingById(listingId!),
    });

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const handleSelect = (ranges: any) => {
        // Update the selected date range when user makes a selection
        setDateRange([ranges.selection]);
    };

    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);

    const timeDifference = end.getTime() - start.getTime();

    const dayCount = timeDifference / (1000 * 60 * 60 * 24);
    console.log(dayCount);

    const customerId = useSelector((state: any) => state?.user?._id);
    const navigate = useNavigate();

    const { mutateAsync } = useMutation({
        mutationFn: apiClient.createBooking,
        onSuccess: () => {
            navigate(`/${customerId}/trips`);
        },
        onError: (error: Error) => {
            console.log("Submit Booking Failed.", error.message);
        },
    });

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("customerId", customerId);
        formData.append("listingId", listingId!);
        formData.append("hostId", listing.creator._id);
        formData.append("startDate", dateRange[0].startDate.toDateString()),
            formData.append("endDate", dateRange[0].endDate.toDateString());
        formData.append("totalPrice", (listing.price * dayCount).toString());

        toast.promise(mutateAsync(formData), {
            loading: "Saving...",
            success: <b>Register Successfully.</b>,
            error: <b>Register failed</b>,
        });
    };

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <div className="listing-details">
                <div className="title">
                    <h1>{listing.title}</h1>
                    <div></div>
                </div>

                <div className="photos">
                    {listing.listingPhotoUrls?.map(
                        (photo: string, index: string) => (
                            <img src={photo} alt="listing photo" key={index} />
                        )
                    )}
                </div>

                <h2>
                    {listing.type} in {listing.city}, {listing.province},{" "}
                    {listing.country}
                </h2>
                <p>
                    {listing.guestCount} guests - {listing.bedroomCount}{" "}
                    bedroom(s) - {listing.bedCount} bed(s) -{" "}
                    {listing.bathroomCount} bathroom(s)
                </p>
                <hr />

                <div className="profile">
                    <img src={`/${listing.creator.profileImagePath}`} />
                    <h3>
                        Hosted by {listing.creator.firstName}{" "}
                        {listing.creator.lastName}
                    </h3>
                </div>
                <hr />

                <h3>Description</h3>
                <p>{listing.description}</p>
                <hr />

                <h3>{listing.highlight}</h3>
                <p>{listing.highlightDesc}</p>
                <hr />

                <div className="booking">
                    <div>
                        <h2>What this place offers?</h2>
                        <div className="amenities">
                            {listing.amenity.map((item: any, index: string) => (
                                <div className="facility" key={index}>
                                    <div className="facility-icon">
                                        {
                                            facilities.find(
                                                (facility: any) =>
                                                    facility.name === item
                                            )?.icon
                                        }
                                    </div>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2>How long do you want to stay?</h2>
                        <div className="date-range-calendar">
                            <DateRange
                                ranges={dateRange}
                                onChange={handleSelect}
                            />
                            {dayCount > 1 ? (
                                <h2>
                                    ${listing.price} x {dayCount} nights
                                </h2>
                            ) : (
                                <h2>
                                    ${listing.price} x {dayCount} night
                                </h2>
                            )}
                            <h2>Total price: ${listing.price * dayCount}</h2>
                            <p>
                                Start Date:{" "}
                                {dateRange[0].startDate.toDateString()}
                            </p>
                            <p>
                                End Date: {dateRange[0].endDate.toDateString()}
                            </p>
                            <button
                                className="button"
                                disabled={!dayCount}
                                type="submit"
                                onClick={handleSubmit}
                            >
                                BOOKING
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListingDetails;
