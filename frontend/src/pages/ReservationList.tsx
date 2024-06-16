import Navbar from "../components/Navbar";
import "../styles/List.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { userActions } from "../redux/state";
import ListingCard from "../components/ListingCard";
import {
    listingType,
    userType,
} from "../../../backend/src/shared/types";
import Footer from "../components/Footer";
import ListingCardSkeleton from "../components/ListingCardSkaleton";

export type tripType = {
    listingId: listingType;
    hostId: userType;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    booking: boolean;
};

const TripList = () => {
    const { userId } = useParams();
    const reservationList = useSelector((state:any) => state.user.reservationList);

    const dispatch = useDispatch();

    const { isLoading, data } = useQuery({
        queryKey: ["fetchTripList", userId],
        queryFn: () => apiClient.fetchReservationList(userId!),
    });

    dispatch(userActions.setReservationList({ reservationList: data }));

    return (
        <>
            <Navbar />
            <h1 className="title-list">Your Reservation List</h1>
                <div className="list">
                {isLoading ? (
                    <ListingCardSkeleton cards={3} />
                ) : (
                  reservationList?.map(
                        ({
                            listingId,
                            hostId,
                            startDate,
                            endDate,
                            totalPrice,
                            booking = true,
                        }: tripType) => (
                            <ListingCard
                                listingId={listingId._id}
                                creator={hostId}
                                listingPhotoUrls={listingId.listingPhotoUrls}
                                city={listingId.city}
                                province={listingId.province}
                                country={listingId.country}
                                category={listingId.category}
                                startDate={startDate}
                                endDate={endDate}
                                totalPrice={totalPrice}
                                booking={booking}
                            />
                        )
                    ))}
                </div>
                <Footer/>
        </>
    );
};

export default TripList;
