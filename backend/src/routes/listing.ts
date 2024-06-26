import { Request, Response, Router } from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import Listing from "../models/Listing";

const router = Router();

/* Configuration Multer for File Upload */
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

// Create Listing
router.post(
    "/create",
    upload.array("listingPhoto", 6),
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newListing = req.body;
            console.log(newListing);

            // 1. upload the images to cloudinary
            const imageUrls = await uploadImages(imageFiles);
            newListing.listingPhotoUrls = imageUrls;
            console.log(newListing);

            const listing = new Listing(newListing);
            await listing.save();

            res.status(201).send(listing);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

/* GET lISTINGS BY CATEGORY */
router.get("/", async (req: Request, res: Response) => {
    const qCategory = req.query.category;

    try {
        let listings;
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate(
                "creator"
            );
        } else {
            listings = await Listing.find().populate("creator");
        }

        res.status(200).json(listings);
    } catch (err: any) {
        res.status(404).json({
            message: "Fail to fetch listings",
            error: err?.message,
        });
        console.log(err);
    }
});

router.get("/:listingId", async (req: Request, res: Response) => {
    const queryId = req.params.listingId;

    try {
        const listing = await Listing.findById(queryId).populate("creator");
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json(listing);
    } catch (error: any) {
        res.status(404).json({
            message: "Fail to fetch listings",
            error: error.message,
        });
        console.log(error);
    }
});

router.get("/search/:search", async (req, res) => {
    const { search } = req.params;
    try {
        let listings = [];

        listings = await Listing.find({
            $or: [
                { category: { $regex: search, $options: "i" } },
                { title: { $regex: search, $options: "i" } },
            ],
        }).populate("creator");

        res.status(200).json(listings);
    } catch (error:any) {
        res.status(404).json({
            message: "Fail to fetch listings",
            error: error.message,
        });
    }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;
