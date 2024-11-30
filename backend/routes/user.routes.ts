import express from "express";
import { authorize } from "../middlewares/authorize.middleware";
import {
    allUser,
    chats as chatUsers,
    createPersonalChat as createPersonalChat,
    getMessage,
    sendMessage,
    userByUserName
} from "../controllers/user.controller";
import {  groupChat } from "../controllers/chat.controller";
const router = express.Router();


router.get("/allUser", authorize, allUser);
router.get("/userbyName", authorize, userByUserName);
router.get("/chatUsers", authorize, chatUsers); 
router.post("/personalchat", authorize, createPersonalChat); 
router.post("/sendMessage", authorize, sendMessage);
router.get("/messages", authorize, getMessage);


router.post("/groupChat", authorize, groupChat);

export default router;
