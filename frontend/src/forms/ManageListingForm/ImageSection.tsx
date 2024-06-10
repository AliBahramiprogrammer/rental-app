import { useFormContext } from "react-hook-form";
import { PlaceFormData } from "./ManageListingForm";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi";
import { IoIosImages } from "react-icons/io";
const ImageSection = () => {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<PlaceFormData>();

    const handleDragPhoto = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(watch("listingPhoto"));
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setValue("listingPhoto", items);
    };

    const handleRemovePhoto = (indexToRemove: any) => {
      let items = Array.from(watch("listingPhoto"));
      items = items.filter((_, index) => index !== indexToRemove );
        setValue("listingPhoto", items);
    };
    return (
        <>
            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
                <Droppable droppableId="photos" direction="horizontal">
                    {(provided) => (
                        <div
                            className="photos"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {(!watch("listingPhoto") ||
                                watch("listingPhoto").length < 1) && (
                                <>
                                    <input
                                        id="image"
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        // onChange={handleUploadPhotos}
                                        multiple
                                        {...register("listingPhoto", {
                                            validate: (listingPhoto) => {
                                                const totalLength =
                                                    listingPhoto.length;
                                                if (totalLength === 0) {
                                                    return "At least one image should be added";
                                                }
                                                if (totalLength > 6) {
                                                    return "Total number of images cannot be more than 6";
                                                }
                                                return true;
                                            },
                                        })}
                                    />
                                    <label htmlFor="image" className="alone">
                                        <div className="icon">
                                            <IoIosImages />
                                        </div>
                                        <p>Upload from your device</p>
                                    </label>
                                </>
                            )}

                            {watch("listingPhoto") &&
                                watch("listingPhoto").length >= 1 && (
                                    <>
                                        {Array.from(watch("listingPhoto")).map(
                                            (photo, index) => {
                                                return (
                                                    <Draggable
                                                        key={index}
                                                        draggableId={index.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                className="photo"
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        photo
                                                                    )}
                                                                    alt="place"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleRemovePhoto(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <BiTrash />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            }
                                        )}
                                        <input
                                            id="image"
                                            type="file"
                                            style={{ display: "none" }}
                                            accept="image/*"
                                            // onChange={handleUploadPhotos}
                                            multiple
                                            {...register("listingPhoto", {
                                                validate: (listingPhoto) => {
                                                    const totalLength =
                                                        listingPhoto.length;
                                                    if (totalLength === 0) {
                                                        return "At least one image should be added";
                                                    }
                                                    if (totalLength > 6) {
                                                        return "Total number of images cannot be more than 6";
                                                    }
                                                    return true;
                                                },
                                            })}
                                        />
                                        <label
                                            htmlFor="image"
                                            className="together"
                                        >
                                            <div className="icon">
                                                <IoIosImages />
                                            </div>
                                            <p>Upload from your device</p>
                                        </label>
                                    </>
                                )}
                        </div>
                    )}
                </Droppable>
                {errors.listingPhoto && (
                    <span style={{color: "#F8395A", fontWeight: "700", display: "block" ,marginBlock: "10px"}}>
                        {errors.listingPhoto.message}
                    </span>
                )}
            </DragDropContext>
        </>
    );
};

export default ImageSection;
