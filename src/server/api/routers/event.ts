import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  slugAvailable: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.prisma.event.findUnique({
        where: {
          slug: input.slug,
        },
      });
      return {
        isSlugAvailable: event ? false : true,
      };
    }),
  create: protectedProcedure
    .input(z.object({ slug: z.string().min(2).max(15), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.event) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      await ctx.prisma.event.create({
        data: {
          slug: input.slug,
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
});
