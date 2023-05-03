
import express from "express";
import {body} from 'express-validator';
import {validate} from "../middleware/validator.js";
import * as authController from "../controller/auth.js"

const router = express.Router();

const validateCredential = [
    body("username").trim().isLength({min:4}).notEmpty().withMessage("아이디에는 빈문자열이 포함되면 안됨"),
    body("password").trim().isLength({min:4}).withMessage("비밀번호 오류"),
    validate
]

const validateSignUp = [
    body("name").notEmpty().withMessage("이름은 반드시 입력하세요!"),
    body("email").isEmail().normalizeEmail().withMessage("이메일을 입력하세요"),
    body("url").isURL().withMessage("URL 오류").optional({nullable:true,checkFalsy:true}),
    validate
]

// GET
// /tweets?username=:username
router.post('/signup', validateSignUp, authController.signup);

router.post('/login', validateCredential, authController.login);

router.get('/me', authController.me);

export default router;