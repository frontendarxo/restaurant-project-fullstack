import type { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { AppError } from "../errors/app-error.js";

export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error.ValidationError) {
        const message = Object.values(err.errors)
            .map(e => e.message)
            .join(', ');
        return res.status(400).json({ message });
    }
    
    if (err instanceof Error.CastError) {
        return res.status(400).json({
            message: 'Некорректные данные'
        });
    }
    
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0];
        const message = field === 'number' 
            ? 'Пользователь с таким номером уже существует'
            : 'Данные уже существуют';
        return res.status(409).json({ message });
    }
    
    if (err instanceof AppError) {      
        return res.status(err.statusCode).json({ message: err.message });
    }
    
    console.error('Необработанная ошибка:', {
        name: err?.name,
        message: err?.message,
        stack: err?.stack,
        code: err?.code
    });
    res.status(500).json({ message: 'Ошибка сервера' });
}