import { FormProvider, useForm } from "react-hook-form";
import ListingFirstStep from "./ListingFirstStep";
import ListingLastStep from "./ListingLastStep";
import { useSelector } from "react-redux";

export type PlaceFormData = {
    creator: string;
    category: string;
    type: string;
    streetAddress: string;
    aptSuite: string;
    city: string;
    province: string;
    country: string;
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    bathroomCount: number;
    amenities: string[];
    title: string;
    description: string;
    highlight: string;
    highlightDesc: string;
    price: number;
    listingPhoto: File[];
    listingPhotoUrls?: string[];
};

type Props = {
    onSave: (placeFormData: FormData) => void;
    isLoading: boolean;
}

const ManageListingForm = ({onSave , isLoading}: Props) => {
    const formMethods = useForm<PlaceFormData>({
        defaultValues: {
            guestCount: 1,
            bathroomCount: 1,
            bedroomCount: 1,
            bedCount: 1,
        },
    });

    const { handleSubmit } = formMethods;
    
    const creatorId = useSelector((state:any)=> state.user._id)

    const onSubmit = handleSubmit((formDataJson: PlaceFormData) => {
        const formData = new FormData();

        formData.append("creator", creatorId);
        formData.append("type", formDataJson.type);
        formData.append("category", formDataJson.category);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("province", formDataJson.province);
        formData.append("streetAddress", formDataJson.streetAddress);
        formData.append("aptSuite", formDataJson.aptSuite);
        formData.append("title", formDataJson.title);
        formData.append("description", formDataJson.description);
        formData.append("highlight", formDataJson.highlight);
        formData.append("highlightDesc", formDataJson.highlightDesc);
        formData.append("price", formDataJson.price.toString());
        formData.append("guestCount", formDataJson.guestCount.toString());
        formData.append("bedCount", formDataJson.bedCount.toString());
        formData.append("bedroomCount", formDataJson.bedroomCount.toString());
        formData.append("bathroomCount", formDataJson.bathroomCount.toString());


        formDataJson.amenities.forEach((amenity, index) => {
            formData.append(`amenity[${index}]`, amenity);
        });

        Array.from(formDataJson.listingPhoto).forEach((listingPhoto) => {
            formData.append(`listingPhoto` , listingPhoto)
        })

        onSave(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form className="" onSubmit={onSubmit}>
                <ListingFirstStep />
                <ListingLastStep />
                <button className="submit_btn" type="submit" disabled={isLoading}>
                    CREATE YOUR LISTING
                </button>
            </form>
        </FormProvider>
    );
};

export default ManageListingForm;
