import { Router, Request, Response } from "express";
import Booking from "../models/Booking";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
    try {
        const newBookingInfo = req.body;
        console.log(newBookingInfo);
        const newBooking = new Booking(newBookingInfo);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;
