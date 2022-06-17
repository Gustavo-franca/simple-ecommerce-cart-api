import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
import config from '../config';
import { Router } from 'express';

const hostName = config.tracer_host;

const middleware = (app: Router) => {
  app.all(
    '/traces',
    createProxyMiddleware({
      target: `http://${hostName}:14268/api/traces`,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      prependPath: true,
      ignorePath: true,
    })
  );
};

export default middleware;
