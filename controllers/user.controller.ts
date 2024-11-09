import { Request, Response, NextFunction } from 'express';
import { getAllUser, getChats, getUserByUserName } from "../services/user.service";

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
export const createPersonalChat = () => {

}
export const getMessage = () => {

}
export const sendMessage = () => {

}
export const userByUserName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userName = req.query.name;
        res.send(await getUserByUserName(userName as string));
    } catch (error) {
        next(error);
    }
}
