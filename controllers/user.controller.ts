import { Request, Response, NextFunction } from 'express';
import { getAllUser } from "../services/user.service";

export const allUser  = async (req : Request , res : Response , next : NextFunction) =>{
        try {            
            res.send(await getAllUser());
        } catch (error) {
            next(error);
        }
}
export const chats  = () =>{
    
}
export const createPersonalChat  = () =>{

}
export const getMessage  = () =>{

}
export const sendMessage  = () =>{

}
export const userByUserName  = () =>{

}
