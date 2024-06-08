import { useFormContext } from "react-hook-form";
import { PlaceFormData } from "./ManageListingForm";
const DescriptionSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<PlaceFormData>();

    return (
        <>
            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
                <div className="full">
                    <label>
                        Title
                        <input
                            type="text"
                            placeholder="Title"
                            {...register("title", {
                                required: "This field is required",
                            })}
                        />
                        {errors.title && <span>{errors.title.message}</span>}
                    </label>
                </div>
                <div className="full">
                    <label>
                        Description
                        <input
                            type="text"
                            placeholder="Description"
                            {...register("description", {
                                required: "This field is required",
                            })}
                        />
                        {errors.description && (
                            <span>{errors.description.message}</span>
                        )}
                    </label>
                </div>
                <div className="full">
                    <label>
                        Highlight
                        <input
                            type="text"
                            placeholder="Highlight"
                            {...register("highlight", {
                                required: "This field is required",
                            })}
                        />
                        {errors.highlight && (
                            <span>{errors.highlight.message}</span>
                        )}
                    </label>
                </div>
                <div className="full">
                    <label>
                        Highlight details
                        <input
                            type="text"
                            placeholder="Highlight details"
                            {...register("highlightDesc", {
                                required: "This field is required",
                            })}
                        />
                        {errors.highlightDesc && (
                            <span>{errors.highlightDesc.message}</span>
                        )}
                    </label>
                </div>
                <div className="price">
                    <p>Now.set your PRICE</p>
                    <span className="priceInput">
                        <input
                            type="number"
                            id="price"
                            min={100}
                            placeholder="100"
                            {...register("price", {
                                required: "This field is required",
                            })}
                        />
                        <label htmlFor="price">$</label>
                    </span>
                    {errors.price && (
                        <span >{errors.price.message}</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default DescriptionSection;
