import mongoose from "mongoose";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await createHash(user.password);
        console.log(user.password);
    }
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    return await isValidPassword(this, password);
};

export const usersModel = mongoose.model(userCollection, userSchema);
