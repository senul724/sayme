import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  createdEvent: publicProcedure
    .mutation(({ ctx }) => {
      const event = ctx.session?.user.event;
      if (event) {
        return {
          created: true,
          slug: event.slug,
        };
      } else {
        return {
          created: false,
          slug: "",
        };
      }
    }),
});
