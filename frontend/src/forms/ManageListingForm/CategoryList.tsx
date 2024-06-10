import { useFormContext } from "react-hook-form";
import { categories as placeCategories } from "../../data";
import { PlaceFormData } from "./ManageListingForm";

const CategoryList = () => {
    const {
        register,
        formState: { errors },
        watch
    } = useFormContext<PlaceFormData>();

    
    const categoriesSelected = watch("category") || "";

    return (
        <>
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
                {placeCategories.map((category, index) => (
                    <label className={`category ${categoriesSelected.includes(category.label) && "selected"}`} key={index}>
                        <input
                            type="radio"
                            value={category.label}
                            {...register("category", {
                                required: "This field is required"
                            })}
                        />
                        <div className="category_icon">{category.icon}</div>
                        <p>{category.label}</p>
                    </label>
                ))}
                {errors.category && (
                    <span>
                        {errors.category.message}
                    </span>
                )}
            </div>
        </>
    );
};

export default CategoryList;
