import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userType } from "../shared/types";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImagePath: {
        type: String,
        required: true,
    },
    tripList: {
        type: Array,
        default: [],
    },
    wishList: {
        type: Array,
        default: [],
    },
    propertyList: {
        type: Array,
        default: [],
    },
    reservationList: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password , salt)
    }
    next()
})


const User = mongoose.model<userType>("User", userSchema);

export default User;
