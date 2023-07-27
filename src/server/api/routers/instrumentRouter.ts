import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const INSTRUMENTS_PER_PAGE = 5;

export const instrumentRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const instruments = await ctx.prisma.instrument.findMany({
        orderBy: { name: "asc" },
        // skip: 0,
        // take: 5,
      });
      return instruments;
    } catch (e) {
      console.error(e);
    }
  }),

  getPage: protectedProcedure
  .input(
    z.object({
      pageNumber: z.number(),
    })
  )
  .query(async ({ input, ctx }) => {
    try {
      const instruments = await ctx.prisma.instrument.findMany({
        orderBy: { name: "asc" },
        skip: (input.pageNumber - 1) * INSTRUMENTS_PER_PAGE,   
        take: INSTRUMENTS_PER_PAGE,
      })
      if (!instruments) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No instruments found",
        });
      }
      return instruments
    } catch (e) {
      console.error(e);
      if (e instanceof TRPCError) {
        throw e;
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unknown error when fetching instruments"
        })
      }
    }
  }),

  getLastPageNum: protectedProcedure.query(async ({ ctx }) => {
    try {
      const instruments = await ctx.prisma.instrument.findMany();
      const lastPageNumber = Math.ceil(instruments.length / INSTRUMENTS_PER_PAGE);
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
