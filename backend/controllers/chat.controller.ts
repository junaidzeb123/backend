import { nextTick } from "process";
import { createGroupChat } from "../services/chat.service"
import { Request , Response , NextFunction } from "express";

export const groupChat = async(req: Request , res : Response , next : NextFunction) => {
    try {
        const groupName = req.body.chatName;
        const users = req.body.users;
        const myId = req.body.user.id;
        
        await createGroupChat(groupName, users, myId);
        res.send({"message" : "group created successfully"})
    } catch (error) {
        next(error);
    }
}