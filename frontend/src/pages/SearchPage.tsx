import { useParams } from "react-router-dom";
import "../styles/List.scss"
import { useSelector,useDispatch  } from "react-redux";
import {  userActions } from "../redux/state";

import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client"
import ListingCardSkeleton from "../components/ListingCardSkaleton";
import { listingType } from "../components/Listings";


const SearchPage = () => {
  const { search } = useParams();
  const listings = useSelector((state:any) => state.listings)

  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["search", search],
    queryFn: ()=> apiClient.fetchListingBySearch(search!)
  })

  dispatch(userActions.setListings({listings:data}))


  return (
    <>
            <Navbar />
            <h1 className="title-list">{search}</h1>
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
  )
}

export default SearchPage