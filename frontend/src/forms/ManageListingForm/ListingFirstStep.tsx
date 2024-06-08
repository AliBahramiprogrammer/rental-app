import BasicCount from "./BasicCount";
import CategoryList from "./CategoryList";
import DetailsSection from "./DetailsSection";
import TypeList from "./TypeList";

const ListingFirstStep = () => {
    return (
        <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <CategoryList />
            <TypeList />
            <DetailsSection />
            <BasicCount />
        </div>
    );
};

export default ListingFirstStep;
