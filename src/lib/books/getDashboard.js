import prisma from "../prisma";
import redis from "../redis";

const getDashboard = async ({ userId, search, where }) => {
  const normalizeSearch = search.trim().toLowerCase();
  const cacheKey = `dashboard:${userId}:${normalizeSearch}`;

  try {
    const cachedBooks = await redis.get(cacheKey);

    if (cachedBooks) {
      console.log("Cache Hit");
      return JSON.parse(cachedBooks);
    }
  } catch (error) {
    console.error("Redis read failed:", error);
  }

  console.log("Cache Miss");

  const bookShelf = await prisma.books.findMany({
    where,
  });

  const CACHE_TTL = 60 * 5;

  try {
    await redis.set(cacheKey, JSON.stringify(bookShelf), "EX", CACHE_TTL);
  } catch (error) {
    console.error("Redis write failed:", error);
  }

  return bookShelf;
};

export default getDashboard;
