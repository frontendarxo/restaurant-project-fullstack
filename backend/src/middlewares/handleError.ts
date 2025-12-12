import type { NextFunction, Request, Response } from "express";

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
}