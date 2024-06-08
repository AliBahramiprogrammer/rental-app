import { useFormContext } from "react-hook-form";
import { PlaceFormData } from "./ManageListingForm";
const DetailsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<PlaceFormData>();

    return (
        <>
            <h3>Where's your place located?</h3>

            <div className="location">
                <div className="full">
                    <label>
                        Street Address
                        <input
                            type="text"
                            placeholder="Street Address"
                            {...register("streetAddress", {
                                required: "This field is required",
                            })}
                        />
                        {errors.streetAddress && (
                            <span>{errors.streetAddress.message}</span>
              )}
                    </label>
                </div>
                <div className="half">
                    <label>
                        Apartment, Suite, etc. (if applicable)
                        <input
                            type="text"
                            placeholder="partment, Suite, etc. (if applicable)"
                            {...register("aptSuite", {
                                required: "This field is required",
                            })}
                        />
                        {errors.aptSuite && (
                            <span>{errors.aptSuite.message}</span>
                        )}
                    </label>
                    <label>
                        City
                        <input
                            type="text"
                            placeholder="City"
                            {...register("city", {
                                required: "This field is required",
                            })}
              />
                        {errors.city && <span>{errors.city.message}</span>}
                    </label>
                </div>
                <div className="half">
                    <label>
                        Province
                        <input
                            type="text"
                            placeholder="Province"
                            {...register("province", {
                                required: "This field is required",
                            })}
                        />
                        {errors.province && (
                            <span>{errors.province.message}</span>
                        )}
                    </label>
                    <label>
                        Country
                        <input
                            type="text"
                            placeholder="Country"
                            {...register("country", {
                                required: "This field is required",
                            })}
                        />
                        {errors.country && (
                            <span>{errors.country.message}</span>
              )}
                    </label>
                </div>
            </div>
        </>
    );
};

export default DetailsSection;
