import { Hono } from 'hono';
import { registerFeed } from './feed.js';
import { registerChapterList } from './chapter-details.js';
import { registerShow } from './show.js';

const mangaRouter = new Hono();

registerFeed(mangaRouter);
registerChapterList(mangaRouter);
registerShow(mangaRouter);

export { mangaRouter };
