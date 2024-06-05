import  bcrypt  from 'bcryptjs';
import express , {Request , Response} from "express";
import multer from "multer";
import User from "../models/User";
import jwt from "jsonwebtoken"
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../frontend/dist/public/uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})


const upload = multer({storage})

router.post("/register", upload.single("profileImage"), async (req:Request, res:Response) => {
    try {
    //    Take all information from the form
        const { firstName, lastName, email, password } = req.body;

    //    The uploaded file is available as reg.file 
        const profileImage = req.file;

        if (!profileImage) {
            return res.status(400).send("No file uploaded")
        }

        // path to the profile image
        const profileImagePath = profileImage.path;
        console.log(profileImagePath);

        // Check if the user exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            profileImagePath
        });

        // Save the new user    
        await newUser.save()

        // Send a successful message
        res.status(200).json({ message: "User registered successfully", user: newUser });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
})


router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //Check the user exists
        const user = await User.findOne({ email })
        if (!user) {
           return res.status(400).json({message: "User not found."})
        }

        const isMatch = await bcrypt.compare(password, user.password!);
        
        if (!isMatch) {
            return res.status(400).json({message : "Invalid password."})
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string);
        user.password = undefined;

        res.status(200).json({ token, user })    
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Something went throw"})
    }
})


export default router;
