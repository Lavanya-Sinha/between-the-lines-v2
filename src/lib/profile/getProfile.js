import requireUser from "../auth/requireUser";
import prisma from "../prisma";

const getProfile = async () => {
  const user = await requireUser();
  const [books, quotes, reflections, doodles] = await Promise.all([
    prisma.books.count({
      where: {
        user_id: user.id,
      },
    }),

    prisma.quotes.count({
      where: {
        book: {
          user_id: user.id,
        },
      },
    }),

    prisma.reflections.count({
      where: {
        quote: {
          book: {
            user_id: user.id,
          },
        },
      },
    }),

    prisma.doodles.count({
      where: {
        quote: {
          book: {
            user_id: user.id,
          },
        },
      },
    }),
  ]);

  return {
    displayName: user.display_name,
    email: user.email,
    provider: user.provider,

    stats: {
      books,
      quotes,
      reflections,
      doodles,
    },
  };
};
export default getProfile;
