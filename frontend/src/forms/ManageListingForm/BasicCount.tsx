import { useFormContext } from "react-hook-form";
import { PlaceFormData } from "./ManageListingForm";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useState } from "react";
const BasicCount = () => {
    const { setValue, getValues } = useFormContext<PlaceFormData>();

    const [guests, setGuests] = useState(Number(getValues("guestCount")));
    const [bedrooms, setBedrooms] = useState(Number(getValues("bedroomCount")));
    const [bathrooms, setBathrooms] = useState(
        Number(getValues("bathroomCount"))
    );
    const [bedCounts, setBedCounts] = useState(Number(getValues("bedCount")));

    setValue("guestCount", guests);
    setValue("bedroomCount", bedrooms);
    setValue("bedCount", bedCounts);
    setValue("bathroomCount", bathrooms);
    
    return (
        <>
            <h3>Share some basics about your place</h3>

            <div className="basics">
                <div className="basic">
                    <p>Guests</p>
                    <div className="basic_count">
                        <RemoveCircleOutline
                            onClick={() => {
                                guests > 1 &&
                                    setGuests((prev) => (prev = prev - 1));                            
                            }}
                            sx={{
                                fontSize: "25px",
                                cursor: "pointer",
                                "&:hover": { color: "#F8395A" },
                            }}
                        />
                        <p>{guests}</p>
                        <AddCircleOutline
                            onClick={() => {
                                setGuests((prev) => (prev = prev + 1));
                            }}
                            sx={{
                                fontSize: "25px",
                                cursor: "pointer",
                                "&:hover": { color: "#F8395A" },
                            }}
                        />
                    </div>
                </div>
                <div className="basic">
                    <p>Bedrooms</p>
                    <div className="basic_count">
                        <RemoveCircleOutline
                            onClick={() => {
                                bedrooms > 1 &&
                                    setBedrooms((prev) => (prev = prev - 1));
                            }}
                            sx={{
                                fontSize: "25px",
                                cursor: "pointer",
                                "&:hover": { color: "#F8395A" },
                            }}
                        />
                        <p>{bedrooms}</p>
                        <AddCircleOutline
                            onClick={() => {
                                setBedrooms((prev) => (prev = prev + 1));
                                
                            }}
                            sx={{
                                fontSize: "25px",
                                cursor: "pointer",
                                "&:hover": { color: "#F8395A" },
                            }}
                        />
                    </div>
                </div>

                <div className="basic">
                    <p>Beds</p>
                    <div className="basic_count">
                        <RemoveCircleOutline
                            onClick={() => {
                                bedCounts > 1 &&
                                    setBedCounts((prev) => (prev = prev - 1));
                            }}
                            sx={{
                                fontSize: "25px",
                                cursor: "pointer",
                                "&:hover": { color: "#F8395A" },
                            }}
                        />
                        <p>{bedCounts}</p>
                        <AddCircleOutline
                            onClick={() => {
                                setBedCounts((prev) => (prev = prev + 1));
                                
                            }}
                            sx={{
                                fontSize: "25px",
                                cursor: "pointer",
                                "&:hover": { color: "#F8395A" },
                            }}
                        />
                    </div>
                </div>

                <div className="basic">
                    <p>Bathrooms</p>
                    <div className="basic_count">
                        <RemoveCircleOutline
                            onClick={() => {
                                bathrooms > 1 &&
                                    setBathrooms((prev) => (prev = prev - 1));
                            }}
                            sx={{
                                fontSize: "25px",
                                cursor: "pointer",
                                "&:hover": { color: "#F8395A" },
                            }}
                        />
                        <p>{bathrooms}</p>
                        <AddCircleOutline
                            onClick={() => {
                                setBathrooms((prev) => (prev = prev + 1));
                                
                            }}
                            sx={{
                                fontSize: "25px",
                                cursor: "pointer",
                                "&:hover": { color: "#F8395A" },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicCount;
