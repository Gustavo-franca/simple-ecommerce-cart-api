import { Cart } from '../types/cart';
import { uuid } from 'uuidv4';
import KVSRepository from '../repository/kvs';
class CartService {
  static async create(): Promise<Cart> {
    const id = uuid();
    return KVSRepository.create(id);
  }

  static async find(id: string): Promise<Cart | null> {
    return KVSRepository.find(id);
  }

  static async update(cart: Cart): Promise<void> {
    return KVSRepository.update(cart);
  }
}

export default CartService;
