
export interface User {
    id: string
    email: string,
    userName: string,
    password: string,
    pic: string,
    verified: boolean,
    googleId: string
};

export interface Message {
    text: string,
    sender: string,
    chat: string
};


export interface Chat {
    chatName: string,
    users: string[],
    isGroupChat: boolean,
    groupAdmin: string,
    latestMessage: string
}



   
  
