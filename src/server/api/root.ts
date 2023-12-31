import { exampleRouter } from "~/server/api/routers/exampleRouter";
import { createTRPCRouter } from "~/server/api/trpc";
import { instrumentRouter } from "./routers/instrumentRouter";
import { musicianRouter } from "./routers/musicianRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  instrument: instrumentRouter,
  musician: musicianRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
