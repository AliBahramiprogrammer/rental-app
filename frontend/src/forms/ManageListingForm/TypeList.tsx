import { useFormContext } from "react-hook-form";
import { types } from "../../data"
import { PlaceFormData } from "./ManageListingForm";

const TypeList = () => {
    const {
        register,
        formState: { errors },
        watch
    } = useFormContext<PlaceFormData>();

    const typeSelected = watch("type") || "";


  return (
      <>
          <h3>What type of place will guests have?</h3>
          <div className="type-list">
              {types.map((item, index) => (
                  <label className={`type ${typeSelected.includes(item.name) && "selected"}`} key={index}>
                      <input type="radio" value={item.name} {...register("type", {
                          required: "This field is required."
                      })} />
                      <div className="type_text">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                        </div>
                      <div className="type_icon">{item.icon}</div>
                  </label>
              ))}
              {errors.type && (
                    <span>
                        {errors.type.message}
                    </span>
                )}
          </div>
      </>
  )
}

export default TypeList