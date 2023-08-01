import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const ITEMS_PER_PAGE = 5;

export const musicianRouter = createTRPCRouter({
  getName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const musician = await ctx.prisma.musician.findUnique({
          where: {
            id: input.id,
          },
        });
        if (!musician) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No musician found",
          });
        }
        return musician.name;
      } catch (e) {
        console.error(e);
        if (e instanceof TRPCError) {
          throw e;
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unknown error when fetching musician",
          });
        }
      }
    }),

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

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const musician = await ctx.prisma.musician.delete({
          where: {
            id: input.id,
          },
        });
        return musician;
      } catch (e) {
        console.error(e);
      }
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string(),
        instrumentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const musician = await ctx.prisma.musician.create({
          data: {
            name: input.name,
            phoneNumber: input.phone,
            emailAddress: input.email,
            instruments: {
              connect: {
                id: input.instrumentId,
              },
            },
          },
        });
        return musician;
      } catch (e) {
        console.error(e);
      }
    }),

  // update: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       name: z.string(),
  //       instrumentId: z.string(),
  //     })
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     try {
  //       const musician = await ctx.prisma.musician.update({
  //         where: {
  //           id: input.id,
  //         },
  //         data: {
  //           name: input.name,
  //           instruments: {
  //             connect: {
  //               id: input.instrumentId,
  //             },
  //           },
  //         },
  //       });
  //       return musician;
  //
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }),
});
