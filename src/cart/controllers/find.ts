import { Request, Response } from 'express';
import CartService from '../services/cart';

export const findCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = await CartService.find(id);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
