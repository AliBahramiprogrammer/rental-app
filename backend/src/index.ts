import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import "dotenv/config";
import authRoutes from "./routes/auth"
import listingRoutes from "./routes/listing";
import userRoutes from "./routes/user"
import bookingRoutes from "./routes/booking"
import { v2 as cloudinary } from "cloudinary";

console.log(process.env.MONGODB_CONNECTION_STRING);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log("Connected to database "+ process.env.MONGODB_CONNECTION_STRING);
    })
    .catch((e) => console.log(e))

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../frontend/dist")))
app.use();

app.use("/api/auth" , authRoutes)
app.use("/api/properties", listingRoutes)
app.use("/api/users", userRoutes)
app.use("/api/bookings", bookingRoutes)


app.listen(7000, () => {
    console.log("Server running on localhost:7000");
})
