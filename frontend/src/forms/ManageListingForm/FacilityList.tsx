import { useFormContext } from "react-hook-form";
import { PlaceFormData } from "./ManageListingForm";
import { facilities } from "../../data";

const FacilityList = () => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext<PlaceFormData>();

    const amenitiesSelected = watch("amenities") || [];
    console.log(amenitiesSelected)

    return (
        <>
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
                {facilities.map((item, index) => (
                    <label
                        className={`facility ${
                            amenitiesSelected.includes(item.name) && "selected"
                            }`}
                        key={index}
                    >
                        <input
                            type="checkbox"
                            value={item.name}
                            {...register("amenities", {
                                validate: (amenities) => {
                                    if (amenities && amenities.length > 0) {
                                        return true;
                                    } else {
                                        return "At least one amenity must be specified.";
                                    }
                                },
                            })}
                        />
                        <div className="facility_icon">{item.icon}</div>
                        <p>{item.name}</p>
                    </label>
                ))}
                {errors.amenities && <span style={{color: "#F8395A", fontWeight: "700", display: "block" ,width: "100%",marginBlock: "10px"}}>{errors.amenities.message}</span>}
            </div>
        </>
    );
};

export default FacilityList;
