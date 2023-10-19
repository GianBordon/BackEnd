import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name:String,
    email:String,
    password:String,
    role: {
        type: String,
        enum: ["admin", "usuario"],
        default: "usuario"
    }
});

export const usersModel = mongoose.model(usersCollection,userSchema);