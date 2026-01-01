import type { NextFunction, Request, Response } from "express";
import User from "../modules/userSchema.js";
import { BadRequestError } from "../errors/bad-request.js";
import { ConflictError } from "../errors/conflict.js";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, number, password, adress } = req.body;
        if (!name || !number || !password || !adress) {
            return next(new BadRequestError('Все поля обязательны'))
        }
        
        const numberStr = String(number).replace(/\D/g, '');
        if (numberStr.length !== 11 || !numberStr.startsWith('8')) {
            return next(new BadRequestError('Номер должен содержать 11 цифр и начинаться с 8'))
        }
        
        const numberValue = Number(numberStr);
        if (isNaN(numberValue)) {
            return next(new BadRequestError('Некорректный номер'))
        }
        
        if (name.length < 4) {
            return next(new BadRequestError('Имя должно быть не менее 4 символов'))
        }
        
        if (password.length < 6) {
            return next(new BadRequestError('Пароль должен быть не менее 6 символов'))
        }
        
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+$/;
        if (!passwordRegex.test(password)) {
            return next(new BadRequestError('Пароль должен содержать только английские символы'))
        }
        
        if (adress.length < 5) {
            return next(new BadRequestError('Адрес должен быть не менее 5 символов'))
        }
        
        const existingUser = await User.findOne({ number: numberValue });
        if (existingUser) {
            return next(new ConflictError('Пользователь с таким номером уже существует'))
        }
        
        const user = await User.create({ name, number: numberValue, password, adress });
        const token = user.generateAuthToken();

        res.status(201)
        .cookie('accessToken', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        .json({ 
            message: 'Пользователь успешно зарегистрирован', 
            token,
            user: { id: user._id, name: user.name, number: user.number }
        });

    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { number, password } = req.body;
        if (!number || !password) {
            return next(new BadRequestError('Номер и пароль обязательны'))
        }
        
        const numberStr = String(number).replace(/\D/g, '');
        if (numberStr.length !== 11 || !numberStr.startsWith('8')) {
            return next(new BadRequestError('Номер должен содержать 11 цифр и начинаться с 8'))
        }
        
        const numberValue = Number(numberStr);
        if (isNaN(numberValue)) {
            return next(new BadRequestError('Некорректный номер'))
        }
        
        const user = await User.findByCredentials(numberValue, password);
        const token = user.generateAuthToken();
        res
        .cookie('accessToken', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        .json({ 
            message: 'Успешный вход',
            token,
            user: { id: user._id, name: user.name, number: user.number }
        });
    } catch (error) {
        next(error);
    }
};