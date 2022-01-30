import { Request, Response } from 'express';
import CartService from '../services/cart';

export const createCart = async (req: Request, res: Response) => {
  try {
    const newCart = await CartService.create();

    res.json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
