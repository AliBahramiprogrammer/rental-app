import { Router , Response , Request } from "express";
import User from "../models/User";
import Listing from "../models/Listing";

const router = Router();

router.patch("/:userId/:listingId", async (req, res) => {
    const userId = req.params.userId;
    const listingId = req.params.listingId;

    try {
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");
        if (!user) {
            return res.status(404).json({message :"User not found"});
        }
        if (!listing) {
            return res.status(404).json({message :"Listing not found"});
        }
        if (listing?.creator?.toString() === userId) {
            return res.status(401).json({message :"Unauthorized"});
        }
        const favoriteListing = user.wishList?.find((wishList: any) => wishList._id.toString() === listingId);

        if (favoriteListing) {
            user.wishList = user.wishList?.filter((wishList: any) => wishList._id.toString() !== listingId);
            await user.save();
            res.status(200).json({message : "Listing is removed from wish list", wishList: user.wishList})
        } else {
            user.wishList?.push(listing)
            user.save()
            res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList})
        }
    } catch (error) {
        res.status(500).send(error);
    }

})


export default router;