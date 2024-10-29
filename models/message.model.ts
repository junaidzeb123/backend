import mongoose, { Schema } from "mongoose";
import { Message } from "../types/entities.interface";

const MessageSchema: Schema = new mongoose.Schema({
    text:
    {
        type: String,
        required: true
    },
    sender:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    chat:
    {
        type: Schema.Types.ObjectId,
        ref : "Chat",
    }
}, { timestamps: true });

export default mongoose.model<Message>('Message', MessageSchema);