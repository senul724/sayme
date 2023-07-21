import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  // sending comments
  sendComment: protectedProcedure
    .input(z.object({ slug: z.string(), content: z.string(), sender: z.string(), time: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const { sender, slug, content, time } = input;
      try {
        await ctx.prisma.comment.create({
          data: {
            name: sender,
            content,
            created_At: time,
            for: {
              connect: {
                slug,
              },
            },
          },
        });
        return {
          success: true,
        };
      } catch {
        return {
          success: false,
        };
      }
    }),
  // get responses
  getComments: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const owner = await ctx.prisma.event.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          user_id: true,
        },
      });

      if (!owner || owner.user_id !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const payload = await ctx.prisma.event.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          comments: true,
        },
      });

      return payload?.comments;
    }),
  // check the availablity of a slug when creating new event
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
  // create a new event
  create: protectedProcedure
    .input(z.object({ slug: z.string().min(2).max(15), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.event) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      try {
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
        return { success: true };
      } catch {
        return { success: false };
      }
    }),
});
