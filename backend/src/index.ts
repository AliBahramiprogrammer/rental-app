import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import "dotenv/config";
import authRoutes from "./routes/auth"

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
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use("/api/auth" , authRoutes)


app.listen(7000, () => {
    console.log("Server running on localhost:7000");
})