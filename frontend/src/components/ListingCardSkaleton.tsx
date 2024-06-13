import Skeleton from "react-loading-skeleton";
import "../styles/ListingCardSkeleton.scss";

interface ListingCardSkeletonProps {
    cards: number;
}

const ListingCardSkeleton: React.FC<ListingCardSkeletonProps> = ({ cards }) => {
    return (
        <>
            {Array(cards)
                .fill(0)
                .map((_, index) => (
                    <div className="card-skeleton" key={index}>
                        <div className="slider-container">
                            <Skeleton width={300} height={200} />
                        </div>
                        <div className="card-body">
                            <h3>
                                <Skeleton />
                            </h3>
                            <div className="text-container">
                                <Skeleton height={72} />
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default ListingCardSkeleton;
