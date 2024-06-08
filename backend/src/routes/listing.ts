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
router.post("/create", upload.array("listingPhoto", 6),
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

        res.status(201).send(listing)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }    
}
)


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