import kvsClient, { KVSClient } from '../../internal/kvs/redis';
import { Cart } from '../types/cart';

class KVSRepository {
  private client: KVSClient;
  constructor() {
    this.client = kvsClient.getConnection();
  }

  async create(id: string): Promise<Cart> {
    const cart = (await this.client.get(id)) as string | null;

    if (cart) return JSON.parse(cart) as Cart;

    const newCart = {
      id,
      products: [],
    };

    await this.client.set(id, JSON.stringify(newCart));

    return newCart;
  }

  async find(id: string): Promise<Cart | null> {
    const cart = (await this.client.get(id)) as string | null;

    if (cart) return JSON.parse(cart) as Cart;

    return null;
  }

  async update({ id, products }: Cart): Promise<void> {
    const cart = (await this.client.get(id)) as string | null;

    if (!cart) throw new Error('not found Cart');

    await this.client.set(id, JSON.stringify({ id, products }));
  }
}

export default new KVSRepository();
