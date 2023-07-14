import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  createdEvent: publicProcedure
    .mutation(({ ctx }) => {
      return (ctx.session?.user.event) ? true : false;
    }),
});
