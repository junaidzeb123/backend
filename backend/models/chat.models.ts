import mongoose, { Schema } from "mongoose";
import { Chat } from "../types/entities.interface";
import { boolean, string } from "zod";
const groupSchema: Schema = new mongoose.Schema({
    chatName:
    {
        type: String,
        // unique: true,
        sparse: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isGroupChat: {
        type: Boolean,
        require: true
    },
    groupAdmin: {
        type: Schema.Types.ObjectId,
        require: 'User'
    },
    latestMessage: {
        type: Schema.Types.ObjectId,
        require: 'Message'
    },
    pic: {
        type: String,
    }

}, { timestamps: true });

export default mongoose.model<Chat>('Chat', groupSchema);
