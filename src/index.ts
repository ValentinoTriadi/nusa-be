import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { serve } from 'bun';
import fs from 'fs';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { RequestIdVariables, requestId } from 'hono/request-id';

import { env } from '@/configs';

import { apiRouter } from './controllers/api.controller';
import { auth } from './lib';

const app = new OpenAPIHono<{
  Variables: RequestIdVariables;
}>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ errors: result.error.flatten() }, 400);
    }
  },
});

// Setup App
app.use(requestId());
app.use(logger());

// Middleware for CORS
app.use(
  '/api/*',
  cors({
    credentials: true,
    origin: env.ALLOWED_ORIGINS,
  }),
);

// Routing
app.route('/api', apiRouter);
app.get('/', (c) => c.json({ message: 'Server runs successfully' }));

// Documentation
app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'AInstein API',
  },
  tags: [{ name: 'health', description: 'Health Check API' }],
});
app.get(
  '/docs',
  apiReference({
    theme: 'purple',
    spec: {
      url: '/openapi.json',
    },
  }),
);

// Auth Mount
app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));
app.use(
  '/api/auth/*',
  cors({
    origin: env.ALLOWED_ORIGINS,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
);

console.log(`Server is running on port ${env.PORT}`);

if (env.NODE_ENV === 'production') {
  serve({
    fetch: app.fetch,
    port: env.PORT || 5001,
  });
  console.log(`Running in production mode on port ${env.PORT || 5001}`);
} else {
  serve({
    fetch: app.fetch,
    port: env.PORT || 5001,
    tls: {
      key: fs.readFileSync('./ssl/key.pem'),
      cert: fs.readFileSync('./ssl/cert.pem'),
    },
  });
}
