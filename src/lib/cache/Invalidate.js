import redis from "../redis";

export const invalidateDashboard = async (userId) => {
  const dashboardKeys = await redis.keys(
    `dashboard:${userId}:*`
  );

  if (dashboardKeys.length > 0) {
    await redis.del(...dashboardKeys);
  }
};

export const invalidateBook = async (bookId) => {
    const keys = await redis.keys(
        `book:${bookId}:*`
    );

    if (keys.length) {
        await redis.del(...keys);
    }
};
export const invalidateQuote = async (quoteId) => {
    const keys = await redis.keys(`quote:${quoteId}:*`);

    if (keys.length > 0) {
        await redis.del(...keys);
    }
};

export const invalidateReflection = async (reflectionId) => {
    await redis.del(`reflection:${reflectionId}`);
};

export const invalidateDoodle = async (quoteId) => {
    await redis.del(`doodle:${quoteId}`);
};