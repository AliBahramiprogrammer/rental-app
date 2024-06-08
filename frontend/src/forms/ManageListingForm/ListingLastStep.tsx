import DescriptionSection from "./DescriptionSection";
import FacilityList from "./FacilityList";
import ImageSection from "./ImageSection";

const ListingLastStep = () => {
    return (
        <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <FacilityList />
            <ImageSection />
            <DescriptionSection />
        </div>
    );
};

export default ListingLastStep;
