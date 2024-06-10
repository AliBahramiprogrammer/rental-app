import { ArrowBackIosNew, ArrowForwardIos, Favorite } from "@mui/icons-material";
import { userType } from "../../../backend/src/shared/types";
import "../styles/ListingCard.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userActions } from "../redux/state";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client"
import toast from "react-hot-toast";

type Props = {
    listingId: string;
    creator: userType;
    listingPhotoUrls: string[];
    city: string;
    province: string;
    country: string;
    category: string;
    type: string;
    price: number;
    startDate?: Date;
    endDate?: Date;
    totalPrice?: number;
    booking: boolean;
};

const ListingCard = ({
    listingId,
    creator,
    listingPhotoUrls,
    city,
    province,
    country,
    category,
    type,
    price,
    booking,
    totalPrice,
}: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user);
    const wishList = user?.wishList || [];

    
    const isLiked = wishList?.find((item: any) => item._id === listingId);
    console.log(isLiked);

    const mutate = useMutation({
        mutationFn: apiClient.patchWishList,
        onSuccess: (data) => {
            dispatch(userActions.setWishList({wishList : data.wishList}));
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    const patchWishList = () => {
        console.log(1111)
        if (user?._id !== creator._id) {
            mutate.mutate({userId: user._id , listingId })
        }
    }

    const goToPrevSlide = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + listingPhotoUrls.length) %
                listingPhotoUrls.length
        );
    };

    const goToNextSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % listingPhotoUrls.length
        );
    };

    return (
        <div
            className="listing-card"
            onClick={() => {
                navigate(`/properties/${listingId}`);
            }}
        >
            <div className="slider-container">
                <div
                    className="slider"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {listingPhotoUrls?.map((photo, index) => (
                        <div key={index} className="slide">
                            <img src={photo} alt={`photo ${index + 1}`} />
                            <div
                                className="prev-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevSlide();
                                }}
                            >
                                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                            </div>
                            <div
                                className="next-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNextSlide();
                                }}
                            >
                                <ArrowForwardIos sx={{ fontSize: "15px" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h3>
                {city}, {province}, {country}
            </h3>
            <p>{category}</p>

            {!booking ? (
                <>
                    <p>{type}</p>
                    <p>
                        <span>${price}</span> per night
                    </p>
                </>
            ) : (
                <>
                    <p>{/* {startDate} - {endDate} */}</p>
                    <p>
                        <span>${totalPrice}</span> total
                    </p>
                </>
            )}

            <button
                className="favorite"
                onClick={(e) => {
                    e.stopPropagation();
                    patchWishList();
                }}
                disabled={!user}
            >
                {isLiked ? (
                    <Favorite sx={{ color: "red" }} />
                ) : (
                    <Favorite sx={{ color: "white" }} />
                )}
            </button>
        </div>
    );
};

export default ListingCard;
