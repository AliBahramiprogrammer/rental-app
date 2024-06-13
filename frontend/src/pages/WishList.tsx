import "../styles/List.scss";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useSelector } from "react-redux";
import { listingType } from "../components/Listings";
import Footer from "../components/Footer";

const WishList = () => {
    const wishList = useSelector((state: any) => state.user.wishList);

    return (
        <>
            <Navbar />
            <h1 className="title-list">Your Wish List</h1>
            <div className="list">
                {wishList?.map(
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
            <Footer/>
        </>
    );
};

export default WishList;
