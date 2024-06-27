import 'dotenv/config';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { mangaRouter } from './handlers/manga/index.js';
import { rateLimiter } from 'hono-rate-limiter';
import { IncomingMessage, ServerResponse } from 'http';
import { trimTrailingSlash } from 'hono/trailing-slash';

type Bindings = {
  incoming: IncomingMessage;
  outgoing: ServerResponse;
};

const port = Number(process.env.PORT || 8080);
const app = new Hono<{ Bindings: Bindings }>({ strict: true });

const limiter = rateLimiter({
  windowMs: 60 * 1000, // 15 minutes
  limit: 120, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  // Method to generate custom identifiers for clients.
  keyGenerator: (c) => {
    const ip =
      c.req.raw.headers.get('x-forwarded-for') ||
      // @ts-ignore
      c.env.outgoing.socket.remoteAddress;

    if (!ip) {
      throw Error('IP address not found');
    }

    return ip;
  },
});

app.use(limiter);
app.use('/*', cors());
app.use(trimTrailingSlash());

app.route('manga', mangaRouter);

app.get('/robots.txt', (c) => {
  return c.text('User-Agent: *\nDisallowAllow: /');
});

console.log(`Server is running on port ${port}`);

process.on('SIGINT', function () {
  // close connections here too.
  process.exit(0);
});

process.on('message', function (msg) {
  if (msg == 'shutdown') {
    console.log('Closing all connections...');

    setTimeout(function () {
      console.log('Finished closing connections');
      process.exit(0);
    }, 1500);
  }
});

serve({ fetch: app.fetch, port });

if (process.send) {
  process.send('ready');
} else if (process.env.ENVIRONMENT === 'production') {
  throw new Error('No parent process');
}
