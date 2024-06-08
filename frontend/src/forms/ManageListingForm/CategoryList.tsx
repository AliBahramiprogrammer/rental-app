import { useFormContext } from "react-hook-form";
import { categories as placeCategories } from "../../data";
import { PlaceFormData } from "./ManageListingForm";

const CategoryList = () => {
    const {
        register,
        formState: { errors },
        watch
    } = useFormContext<PlaceFormData>();

    
    const categoriesSelected = watch("categories") || [];
    console.log(categoriesSelected)

    return (
        <>
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
                {placeCategories.map((category, index) => (
                    <label className={`category ${categoriesSelected.includes(category.label) && "selected"}`} key={index}>
                        <input
                            type="checkbox"
                            value={category.label}
                            {...register("categories", {
                                validate: (categories) => {
                                    if (categories && categories.length > 0) {
                                        return true;
                                    } else {
                                        return "At least one category is required";
                                    }
                                },
                            })}
                        />
                        <div className="category_icon">{category.icon}</div>
                        <p>{category.label}</p>
                    </label>
                ))}
                {errors.categories && (
                    <span>
                        {errors.categories.message}
                    </span>
                )}
            </div>
        </>
    );
};

export default CategoryList;
