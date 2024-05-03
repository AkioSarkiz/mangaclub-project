import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { mangaRouter } from "./manga";

const port = 8080;
const app = new Hono();

app.use("/*", cors());
app.route("manga", mangaRouter);

console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });
