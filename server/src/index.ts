import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { mangaRouter } from "./manga";

const port = 8080;
const app = new Hono();

app.use("/*", cors());
app.route("manga", mangaRouter);

console.log(`Server is running on port ${port}`);

process.on("SIGINT", function () {
  // close connections here too.
  process.exit(0);
});

process.on("message", function (msg) {
  if (msg == "shutdown") {
    console.log("Closing all connections...");

    setTimeout(function () {
      console.log("Finished closing connections");
      process.exit(0);
    }, 1500);
  }
});

serve({ fetch: app.fetch, port });

if (process.send) {
  process.send("ready");
} else if (process.env.ENVIRONMENT === "production") {
  throw new Error("No parent process");
}
