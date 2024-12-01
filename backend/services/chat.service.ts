import chatModels from "../models/chat.models";
import messageModel from "../models/message.model";
import { AppError } from "../error/AppError";
import mongoose from "mongoose";
import { Chat } from "../types/entities.interface";

export const createGroupChat = async (chatName: string, users: string[], groupAdmin: string, pic : string): Promise<Chat> => {
    try {
        console.log("users: " , users.map((user) =>  new mongoose.Types.ObjectId(user)) );
        
        const chat = await chatModels.create({
            chatName,
            users: [...users , groupAdmin],
            isGroupChat: true,
            groupAdmin,
            pic
        });        
        return chat;
    } catch (error) {
        throw new AppError(`An error have occured while creating group chat , ${error} `, 500);
    }
}

export const insertMessage = async (sender: string, chatId: string, text: string): Promise<Chat | null> => {
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
        return await chatModels.findById(chatId);
    } catch (error) {
        console.log("error in inserting chating");
        
        throw new AppError(`An error have occured while saving message , ${error} `, 500);
    }
}


