import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please Provide your email"],
        unique: [true, "This Email is already exists"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
    },
    status: {
        type: String,
        default: "Hey there! I am using travomint chat"
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password should be at least 6 characters long"],
        maxLength: [100, "Password should not be more than 100 characters long"]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "manager", "teamlead"]
    },
    department: {
        type: String,
        default: "General"
        // Add more departments as needed
    },
    designation: {
        type: String,
        default: "Snva Employee"
    }
}, {
    collection: "users",
    timestamps: true
});

userSchema.pre("save", async function (next) {
    try {
      if (this.isNew) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
});

const UserModel = mongoose.models.UserModal || mongoose.model("UserModel", userSchema);
export default UserModel;