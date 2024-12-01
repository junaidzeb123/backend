import { nextTick } from "process";
import { createGroupChat } from "../services/chat.service"
import { Request, Response, NextFunction } from "express";

export const groupChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupName = req.body.chatName;
        const users = req.body.users;
        const myId = req.body.user.id;
        const pic = req.body.user.pic;

        const result = await createGroupChat(groupName, users, myId, pic);
        return res.send(result)
    } catch (error) {
        next(error);
    }
}