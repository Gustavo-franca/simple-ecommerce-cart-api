import { Router } from 'express';
import { createCart } from '../controllers/create';
import { updateCart } from '../controllers/update';
import { findCart } from '../controllers/find';

const router = Router();

router.post('/', createCart);
router.put('/', updateCart);
router.get('/:id', findCart);

export default router;
