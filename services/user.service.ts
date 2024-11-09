import userModel from "../models/user.model";
import chatModel from "../models/chat.models";
import { Chat, Message, User } from "../types/entities.interface";
import { AppError } from "../error/AppError";
import * as bcrypt from "bcrypt"
import { BASE_ADDRESS, HASH_THINGS, JWT_THINGS } from "../config/environmentvariable";
import { sendMail } from "../emailService/sendmail";
import { generateToken } from "./generateJwt";
import { UserExport } from "../types/types";
import MessageModel from '../models/message.model'


const generateVerificationLink = async (id: string): Promise<string> => {
    const expiresIn = JWT_THINGS.USERVERIFICATION.EXPIRATION_TIME;
    const secret = JWT_THINGS.USERVERIFICATION.JWTSECRET;
    const token = await generateToken({ id }, expiresIn, secret);
    const link = `${BASE_ADDRESS.BACKEND}/auth/verify/${token}`;
    return link;
}

const isEmailAvailabe = async (email: string): Promise<boolean> => {
    try {
        const response = await userModel.find({
            email
        });

        return response.length === 0;
    } catch (error) {
        throw new AppError("Internal Server Error", 500);
    }
}


const isUserNameAvailabe = async (userName: string): Promise<boolean> => {
    try {
        const response = await userModel.find({
            userName
        });

        return response.length === 0;
    } catch (error) {
        throw new AppError("Internal Server Error", 500);
    }
}

export const createUser = async (user: User): Promise<User> => {
    try {
        if (!(await isEmailAvailabe(user.email))) {
            throw new AppError("Email Already Exists", 409);
        }

        if (!(await isUserNameAvailabe(user.userName))) {
            throw new AppError("Username Already Exists", 409);
        }

        const hashedPassword = await bcrypt.hash(user.password, Number(HASH_THINGS.SALT));
        user.password = hashedPassword;
        const newUser = new userModel({
            ...user,
            verified: false,
        });

        const dbUser = await newUser.save();
        const link = await generateVerificationLink(dbUser.id);
        await sendMail("register", link, user.email);
        return newUser;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        } else if (error instanceof Error) {
            throw new AppError(`Error Creating User: ${error.message}`, 500);
        } else {
            throw new AppError('An unknown error occurred while creating the user.', 500);
        }
    }
}

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        return await userModel.findById(id);
    } catch (error) {
        throw new AppError("Error in find your by Id", 500);
    }

}

export const checkEmailAndPassword = async (username: string, password: string): Promise<User | null> => {
    try {

        let user: User | null = await userModel.findOne({ email: username });
        if (!user) {
            user = await userModel.findOne({ userName: username });
        }
        console.log(username , password);
        
        if (!user) return null;
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    } catch (error) {
        throw new AppError("Error in verifying user", 500);
    }
}

export const markVerifyTrue = async (id: string): Promise<void> => {
    try {
        const user = await userModel.findByIdAndUpdate(id, { verified: true }, { new: true });

    } catch (error) {
        throw new AppError("Error in updating user", 500);
    }
}

export const getAllUser = async (): Promise<UserExport[]> => {

    try {
        let users: UserExport[] = [];
        users = (await userModel.find()).map((user) => {
            return {
                email: user.email,
                userName: user.userName,
                pic: user.pic,
                id: user.id,
            }
        });
        return users;
    } catch (error) {
        throw new AppError("Error occured in accessing User" , 500)
    }
}

export const getChats = async (userId: string) : Promise<Chat[]>=> {
    try {
        console.log("chats");
        const chats: Chat[] = await chatModel.find({"users" : userId});
        
        chats.forEach(async(chat) =>{
            if(chat.isGroupChat == false) {
                for (const element of chat.users) {
                    if(element != userId) {
                        chat.chatName = ( await userModel.findById(element) )?.userName as string;
                    } 
                }
            }
        })

        return chats;
    } catch (error ) {
        
        throw new AppError(`Error occured in accessing User `, 500);
    }
}

export const getUsersByName = async (name: string): Promise<UserExport[]> => {
    try {
        const res: User[] | null = await userModel.find({
            $or: [
                { userName: name },
                { email: name }
            ]
        });

        const users = res.map((user) => {
            if (user) {
                return {
                    email: user.email,
                    userName: user.userName,
                    pic: user.pic,
                    id: user.id,
                }
            }
        });
        return users.filter((user) => user !== undefined);
    } catch (error) {
        throw new AppError("An error have occured in accessing user.", 500);
    }
}

export const getUserByUserName = async (username: string): Promise<UserExport | undefined> => {
    try {
        const user = await userModel.findOne({
            userName: username
        });
        if (!user) return undefined;
        return {
            userName: user.userName,
            email: user.email,
            pic: user.pic,
            id: user.id
        }
    } catch (error) {
        throw new AppError("Error in accessing user.", 500);
    }
}
export const getChatId = async (user1: string, user2: string): Promise<string | null> => {
    try {
        console.log(user1, user2);
        const chat = await chatModel.findOne({
            isGroupChat : false,
            users : { $all : [user1, user2]}
        });
        return chat?.id;
    } catch (error) {
        throw new AppError("Error in fetching chat info.", 500);
    }
}

export const createChatDocument = async (user1: string, user2: string): Promise<string> => {
    try {
        const chat = await chatModel.create({
            isGroupChat : false,
           users : [ user1,user2]
        });
        return chat.id;
    } catch (error) {
        throw new AppError("Error in creating new chat.", 500);
    }
}


export const getMessageByChatId = async (chatId : string): Promise<Message[]> => {
    try {
        const messages = await MessageModel.find({
            chat : chatId
        });
        return messages;
    } catch (error) {
        throw new AppError("Error in getting messages.", 500);
    }
}