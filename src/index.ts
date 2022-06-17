import { init } from './tracer';

init('cart-api', 'development');

import middleware from './proxy';

import express from 'express';
import config from './config';
import cartRouter from './cart/routes';
import cors from 'cors';

const app = express();

app.use(cors());

middleware(app);

app.use('/cart', express.json());

app.use('/cart', cartRouter);

app.listen(config.port, () => console.log(`listing in ${config.port}`));
