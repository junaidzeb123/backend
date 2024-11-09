import { Request, Response, NextFunction } from 'express';
import { createChatDocument, getAllUser, getChatId, getChats, getMessageByChatId, getUserByUserName } from "../services/user.service";
import { AppError } from '../error/AppError';
import { insertMessage } from '../services/chat.service';
import test from 'node:test';

export const allUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.send(await getAllUser());
    } catch (error) {
        next(error);
    }
}
export const chats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.user.id;
        res.send(await getChats(id));
    } catch (error) {
        next(error);
    }
}
export const createPersonalChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.user.id;
        const userName = req.query.user;
        const user = await getUserByUserName(userName as string);
        if (!user) {
            next(new AppError("User does't exist", 404));
        }
        let chatId = await getChatId(id, user?.id as string);
        if (chatId) {
            res.send({ chatId });
        }
        res.send(await createChatDocument(id, user?.id as string));
    } catch (error) {

        next(error);
    }
}
export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chatId = req.body.chatId as string;
        await(getMessageByChatId(chatId));

    } catch (error) {
        next(error);
    }
}
export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const myId = req.body.user.id;
        const chatId = req.query.chatId;
        const message = req.body.text;
        insertMessage(myId, chatId as string, message);
        res.send({ message: "message sent" });
    } catch (error) {
        next(error);
    }

}
export const userByUserName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userName = req.query.name;
        res.send(await getUserByUserName(userName as string));
    } catch (error) {
        next(error);
    }
}
