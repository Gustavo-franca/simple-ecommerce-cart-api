import { Tedis } from 'tedis';
import config from '../../config';

const getConnection = (): Tedis => {
  return new Tedis({
    host: config.kvs_host,
    port: config.kvs_port,
    password: config.kvs_password,
  });
};

export type KVSClient = Tedis;

export default {
  getConnection,
};
