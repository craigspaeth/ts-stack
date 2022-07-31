import * as trpc from "@trpc/server";
import Tweet, { Tweet as ITweet } from "../models/tweet";
import z from "zod";

export const appRouter = trpc
  .router()
  .query("Tweet.getAll", { resolve: () => Tweet.getAll() })
  .mutation("Tweet.create", {
    input: z.object({ name: z.string(), body: z.string() }),
    resolve: ({ input }) => Tweet.create(input as any),
  })
  .mutation("Tweet.del", {
    input: z.number(),
    resolve: ({ input: id }) => Tweet.del(id),
  });

export type AppRouter = typeof appRouter;
