import chatModels from "../models/chat.models";
import messageModel from "../models/message.model";
import { AppError } from "../error/AppError";
import mongoose from "mongoose";

export const createGroupChat = async (chatName: string, users: string[], groupAdmin: string): Promise<void> => {
    try {
        console.log(users);
        console.log("users: " , users.map((user) =>  new mongoose.Types.ObjectId(user)) );
        
        const chat = await chatModels.create({
            chatName,
            users: [...users],
            isGroupChat: true,
            groupAdmin
        });
        
    } catch (error) {
        throw new AppError(`An error have occured while creating group chat , ${error} `, 500);
    }
}

export const insertMessage = async (sender: string, chatId: string, text: string): Promise<void> => {
    try {
        const message = await messageModel.create({
            text,
            sender,
            chat: chatId
        });
        await message.save();

        await chatModels.findByIdAndUpdate(chatId, {
            latestMessage: message.id
        });
    } catch (error) {
        throw new AppError(`An error have occured while saving message , ${error} `, 500);
    }
}


