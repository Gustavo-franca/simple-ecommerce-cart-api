type Config = {
  port: number;
  kvs_host: string;
  kvs_port: number;
  kvs_password: string;
  tracer_host: string;
};

const getNumberOrDefault = (
  value: string | undefined,
  defaultValue: number
) => {
  if (Number(value)) return Number(value);
  return defaultValue;
};

const getStringOrDefault = (
  value: string | undefined,
  defaultValue: string
) => {
  if (value) return value;
  return defaultValue;
};

const config: Config = {
  port: getNumberOrDefault(process.env.PORT, 3333),
  kvs_host: getStringOrDefault(process.env.KVS_HOST, '127.0.0.1'),
  kvs_port: getNumberOrDefault(process.env.KVS_PORT, 6379),
  kvs_password: getStringOrDefault(process.env.KVS_PASSWORD, 'secret'),
  tracer_host: getStringOrDefault(process.env.TRACER_HOST, 'localhost'),
};

export default config;
