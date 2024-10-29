import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../types/entities.interface';



const userSchema: Schema = new Schema({
    email:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    userName:
    {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    password:
    {
        type: String
    },

    pic:
    {
        type: String,
        required: true
    },

    verified:
    {
        type: Boolean,
        required: true
    },

    googleId:
    {
        type: String,
    },

}, { timestamps: true });


export default mongoose.model<User>('User', userSchema);
