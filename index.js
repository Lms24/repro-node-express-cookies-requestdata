import * as Sentry from "@sentry/node";

import express from "express";

import {sentryRouter} from './sentry-router.js'

const app = express();

Sentry.init({
    dsn: 'https://3517e870db694e11ac3fff20f9bff10d@o447951.ingest.sentry.io/4505437769039872',
    beforeSend(event) {
      console.log(event.request);
      if (event.request) {
        delete event.request?.cookies;
      }
      return event;
    },
    debug: true,
});

// This WILL NOT include cookies
app.use(Sentry.Handlers.requestHandler({include: {request: ["data", "headers", "method", "query_string", "url"]}}));

// These WILL include cookies:
// app.use(Sentry.Handlers.requestHandler({include: {request: ["data", "headers", "method", "query_string", "url", "cookies"]}}));
// app.use(Sentry.Handlers.requestHandler());

app.use("/sentrydebug", sentryRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(Sentry.Handlers.errorHandler({}));

app.listen(3000, () => {
  console.log("server started on port 3000");
});