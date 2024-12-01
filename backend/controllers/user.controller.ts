import { Request, Response, NextFunction } from 'express';
import { createChatDocument, getAllUser, getChatId, getChats, getMessageByChatId, getUserByUserName } from "../services/user.service";
import { AppError } from '../error/AppError';
import { insertMessage } from '../services/chat.service';
import { body, query, validationResult } from 'express-validator';
import { Chat } from '../types/entities.interface';

export const allUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        return res.send(await getAllUser());
    } catch (error) {
        next(error);
    }
}
export const chats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.user.id;
        return res.send(await getChats(id));
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
            return res.send({ chatId });
        }
        return res.send(await createChatDocument(id, user?.id as string));
    } catch (error) {

        next(error);
    }
}
export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.query);

        const chatId = req.query.chatId as string;
        return res.send(await (getMessageByChatId(chatId)));

    } catch (error) {
        next(error);
    }
}

export const validateSendMessage = [
    body('user.id').notEmpty().withMessage('User ID is required'),
    body('text').isString().notEmpty().withMessage('Message text is required and must be a non-empty string'),
    query('chatId').isString().notEmpty().withMessage('Chat ID is required'),
];

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const myId = req.body.user.id;
        const chatId = req.query.chatId as string;
        const message = req.body.text;

        const chat: Chat | null = await insertMessage(myId, chatId, message);
        return res.status(200).send({ chat });
    } catch (error) {
        next(error);
    }
}



export const userByUserName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userName = req.query.name;
        return res.send(await getUserByUserName(userName as string));
    } catch (error) {
        next(error);
    }
}
