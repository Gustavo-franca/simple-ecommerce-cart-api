import { Request, Response } from 'express';
import CartService from '../services/cart';
import { Cart } from '../types/cart';

export const updateCart = async (
  req: Request<unknown, unknown, Cart>,
  res: Response
) => {
  try {
    const { id, products } = req.body;

    await CartService.update({ id, products });

    res.send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
