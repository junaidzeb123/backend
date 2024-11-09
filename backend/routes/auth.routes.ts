import express from "express";
import { login, register, verifyUser } from "../controllers/auth.controller";
import { check } from 'express-validator';

const router = express.Router();

const registerValidation = [
    check('userName').notEmpty().withMessage("Username can't be empty"),
    check('email').isEmail().withMessage("Email can't be empty"),
    check('password').notEmpty().withMessage("Password can't be empty"),
    check('pic').notEmpty().withMessage("pic can't be empty"),
]


const loginValidation = [
    check('userName').notEmpty().withMessage("Username can't be empty"),
    check('password').notEmpty().withMessage("Password can't be empty"),
]


router.post('/register', registerValidation, register);
router.get('/verify/:token', verifyUser);
router.post('/login',loginValidation, login);
export default router;