import exp from "constants"


export interface JwtPayload {
    id: string
};

export interface UserExport {
    email: string,
    userName: string,
    pic: string,
    id: string
}

export interface GetAllChatsInterfacce {
    id: string
    chatName: string,
    users: string[],
    isGroupChat: boolean,
    groupAdmin: string,
    latestMessage: string,
    latestMessageText: string | undefined,
    userName?: string | null,
    pic?: string | null,
}


export interface getMessageWithPIc {
        text: string,
        sender: string,
        chat: string
        pic?:string
    }