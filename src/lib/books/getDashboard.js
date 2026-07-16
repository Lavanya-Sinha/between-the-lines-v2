import prisma from "../prisma";
import redis from "../redis";
import log from "../logging/logger";

const getDashboard = async ({ userId, search }) => {
  try {
    const normalizeSearch = (search ?? "").trim().toLowerCase();
    const cacheKey = `dashboard:${userId}:${normalizeSearch}`;

    try {
      const cachedBooks = await redis.get(cacheKey);

      if (cachedBooks) {
        log({
          level: "INFO",
          operation: "Dashboard Cache",
          message: "Cache hit.",
          userId,
        });
        return JSON.parse(cachedBooks);
      }
    } catch (error) {
      log({
        level: "WARN",
        operation: "Dashboard Cache",
        message: "Redis read failed.",
        error: error.message,
        userId,
      });
    }

    log({
      level: "INFO",
      operation: "Dashboard Cache",
      message: "Cache Miss.",
      userId,
    });
    const where = {
      user_id: userId,
    };
    if (normalizeSearch) {
      where.OR = [
        {
          title: {
            contains: normalizeSearch,
            mode: "insensitive",
          },
        },
        {
          author: {
            contains: normalizeSearch,
            mode: "insensitive",
          },
        },
        {
          genres: {
            has: normalizeSearch,
          },
        },
      ];
    }
    const bookShelf = await prisma.books.findMany({
      where,
      select: {
        id: true,
        title: true,
        author: true,
        genres: true,
        cover_img: true,
        created_at: true,
      },
    });
    const CACHE_TTL = 60 * 5;

    try {
      await redis.set(cacheKey, JSON.stringify(bookShelf), "EX", CACHE_TTL);
    } catch (error) {
      console.error("Redis write failed:", error);
    }

    return bookShelf;
  } catch (error) {
    log({
      level: "ERROR",

      file: "src/lib/books/getDashboard.js",

      operation: "Fetch Dashboard",

      message: "Failed to fetch Dashboard.",

      error: error.message,
    });
    throw error;
  }
};

export default getDashboard;
