import type { NextFunction, Request, Response } from "express"
import Food from "../modules/FoodSchema.js"

export const getAllFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foods = await Food.find();
        if(foods.length === 0) {
            return res.status(404).json({ message: 'Foods not found' });
        }
        res.status(200).json({ foods });
    } catch (error) {
        next(error)
    }
}


export const getFoodByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category } = req.params;
        const foods = await Food.find({ category: category as string });
        if(foods.length === 0) {
            return res.status(404).json({ message: 'Foods not found' });
        }
        res.status(200).json({ foods });
    } catch (error) {
        next(error)
    }
}