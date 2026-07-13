import prisma from "../prisma";
import redis from "../redis";

const getBook = async ({ id, searchText, include }) => {
  const normalizeSearch = searchText.trim().toLowerCase();
  const cacheKey = `book:${id}:${normalizeSearch}`;

  try {
    const cachedBook = await redis.get(cacheKey);

    if (cachedBook) {
      console.log("Book Cache Hit");
      return JSON.parse(cachedBook);
    }
  } catch (error) {
    console.error("Redis read failed:", error);
  }

  console.log("Book Cache Miss");

  const book = await prisma.books.findUnique({
    where: {
      id: Number.parseInt(id),
    },
    include,
  });

  const CACHE_TTL = 60 * 5;

  try {
    await redis.set(cacheKey, JSON.stringify(book), "EX", CACHE_TTL);
  } catch (error) {
    console.error("Redis write failed:", error);
  }

  return book;
};

export default getBook;