import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const ITEMS_PER_PAGE = 5;

export const musicianRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        instrumentId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const musicians = await ctx.prisma.musician.findMany({
          where: {
            instruments: {
              some: {
                id: input.instrumentId,
              },
            },
          },
          orderBy: { name: "asc" },
        });
        return musicians;
      } catch (e) {
        console.error(e);
      }
    }),

  getPage: protectedProcedure
    .input(
      z.object({
        pageNumber: z.number(),
        instrumentId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const musicians = await ctx.prisma.musician.findMany({
          where: {
            instruments: {
              some: {
                id: input.instrumentId,
              },
            },
          },
          orderBy: { name: "asc" },
          skip: (input.pageNumber - 1) * ITEMS_PER_PAGE,
          take: ITEMS_PER_PAGE,
        });
        if (!musicians) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No musicians found",
          });
        }
        return musicians;
      } catch (e) {
        console.error(e);
        if (e instanceof TRPCError) {
          throw e;
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unknown error when fetching musicians",
          });
        }
      }
    }),

  getLastPageNum: protectedProcedure
    .input(
      z.object({
        instrumentId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const musicians = await ctx.prisma.musician.findMany({
          where: {
            instruments: {
              some: {
                id: input.instrumentId,
              },
            },
          },
        });
        const lastPageNumber = Math.ceil(musicians.length / ITEMS_PER_PAGE);
        return lastPageNumber;
      } catch (e) {
        console.error(e);
      }
    }),

  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
