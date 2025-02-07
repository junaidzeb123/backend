import userModel from "../models/user.model";
import chatModel from "../models/chat.models";
import { Chat, Message, User } from "../types/entities.interface";
import { AppError } from "../error/AppError";
import * as bcrypt from "bcrypt"
import { BASE_ADDRESS, HASH_THINGS, JWT_THINGS } from "../config/environmentvariable";
import { sendMail } from "../emailService/sendmail";
import { generateToken } from "./generateJwt";
import { GetAllChatsInterfacce, getMessageWithPIc, UserExport } from "../types/types";
import MessageModel from '../models/message.model'
import { prependOnceListener } from "process";
import { userByUserName } from "../controllers/user.controller";
import { promiseHooks } from "v8";


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
        console.log(username, password);

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
        throw new AppError("Error occured in accessing User", 500)
    }
}

/**
 * Chat
 * Latest Message
 */
export const getChats = async (userId: string): Promise<GetAllChatsInterfacce[]> => {
    try {
        console.log("chats");
        const chats = await chatModel.find({ "users": userId });

        const res: GetAllChatsInterfacce[] = [];
        let pre: Promise<Message | null>[] = [];

        // getting the latest message for each chat
        const names: Promise<{ userName: string, pic: string } | null>[] = [];
        chats.forEach((chat) => {
            pre.push(MessageModel.findById(chat.latestMessage));
            // getting the username if chat is not group
            if (!chat.isGroupChat) {
                let get = false;
                for (const ids of chat.users) {
                    if (ids != userId) {
                        names.push(userModel.findById(ids, { userName: 1, pic: 1 })) ;
                        get  = true;
                        break;
                    }
                }
                if(!get) names.push(Promise.resolve(null));
            } else {
                names.push(Promise.resolve(null));
            }
        });
        

        const result1 = await (Promise.all(pre));
        const result2 = await (Promise.all(names));
        console.log( result1 ,result2);
        
        for (let i = 0; i < chats.length; i++) {
            res.push(
                {
                    chatName: chats[i]?.chatName as string,
                    users: chats[i]?.users,
                    isGroupChat: chats[i]?.isGroupChat,
                    groupAdmin: chats[i]?.groupAdmin,
                    latestMessage: chats[i]?.latestMessage,
                    latestMessageText: result1[i]?.text,
                    id: chats[i]?._id as unknown as string,
                    userName: result2[i]?.userName,
                    pic: result2[i]?.pic,
                }
            )
        }


        return res;
    } catch (error) {
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
            isGroupChat: false,
            users: { $all: [user1, user2] }
        });
        return chat?.id;
    } catch (error) {
        throw new AppError("Error in fetching chat info.", 500);
    }
}

export const createChatDocument = async (user1: string, user2: string): Promise<string> => {
    try {
        const chat = await chatModel.create({
            isGroupChat: false,
            users: [user1, user2]
        });
        return chat.id;
    } catch (error) {
        throw new AppError("Error in creating new chat.", 500);
    }
}


export const getMessageByChatId = async (chatId: string): Promise<Message[]> => {
    try {
        console.log(chatId);

        const messages : Message[] = await MessageModel.find({
            chat: chatId
        }).sort(
            { createdAt: 1 }
        );


        const res: Promise<{ pic: string } | null>[] = [];
        for (let i = 0; i < messages.length; i++) {
            res.push(userModel.findById(messages[i].sender, { pic: 1 }))
        }

        const result = await Promise.all(res);
        const response : getMessageWithPIc[] = [];
        console.log("result" , result);
        
        for (let i = 0; i < messages.length; i++) {   
            response.push({ 
                pic :  result[i]?.pic ,
                sender : messages[i].sender,
                text : messages[i].text,
                chat : messages[i].chat
            });
        }

        console.log("Messges" , response);
        


        return response;
    } catch (error) {
        throw new AppError("Error in getting messages.", 500);
    }
}