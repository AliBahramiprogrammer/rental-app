import { Router, Response, Request } from "express";
import User from "../models/User";
import Listing from "../models/Listing";
import Booking from "../models/Booking";

const router = Router();

router.patch("/:userId/:listingId", async (req, res) => {
    const userId = req.params.userId;
    const listingId = req.params.listingId;

    try {
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        if (listing?.creator?.toString() === userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const favoriteListing = user.wishList?.find(
            (wishList: any) => wishList._id.toString() === listingId
        );

        if (favoriteListing) {
            user.wishList = user.wishList?.filter(
                (wishList: any) => wishList._id.toString() !== listingId
            );
            await user.save();
            res.status(200).json({
                message: "Listing is removed from wish list",
                wishList: user.wishList,
            });
        } else {
            user.wishList?.push(listing);
            user.save();
            res.status(200).json({
                message: "Listing is added to wish list",
                wishList: user.wishList,
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:userId/trips", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const trips = await Booking.find({ customerId: userId }).populate(
            "customerId hostId listingId"
        );
        if (!trips) {
            res.status(404).send({ message: "There are no trips!!" });
        }
        res.status(202).send(trips);
    } catch (error: any) {
        res.status(404).json({
            message: "Can not find trips!",
            error: error.message,
        });
    }
});

router.get("/:userId/properties", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const properties = await Listing.find({ creator: userId }).populate("creator");
        res.status(202).json(properties);
    } catch (error:any) {
        res.status(404).json({ message: "Can not find properties!", error: error.message })
    }
})

router.get("/:userId/reservations", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const reservations = await Booking.find({ hostId: userId }).populate(
            "customerId hostId listingId"
        );
        if (!reservations) {
            res.status(404).send({ message: "There are no reservations!!" });
        }
        res.status(202).send(reservations);
    } catch (error: any) {
        res.status(404).json({
            message: "Can not find reservations!",
            error: error.message,
        });
    }
})

export default router;
