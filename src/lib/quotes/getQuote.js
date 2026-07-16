import prisma from "../prisma";
import redis from "../redis";
import log from "../logging/logger";

const getQuote = async ({ quoteId, searchReflectionz }) => {
try {
  
  const normalizeSearch = searchReflection.trim().toLowerCase();
  const cacheKey = `quote:${quoteId}:${normalizeSearch}`;

  try {
    const cachedQuote = await redis.get(cacheKey);

    if (cachedQuote) {
      console.log("Quote Cache Hit");
      return JSON.parse(cachedQuote);
    }
  } catch (error) {
    console.error("Redis read failed:", error);
  }

  console.log("Quote Cache Miss");

    const include = {
    reflections: {
      where: {
        content: {
          contains: searchReflection,
          mode: "insensitive",
        },
      },
    },
    mood_tags: true,
    doodle: true,
    attachments: true,
  };


  const quote = await prisma.quotes.findUnique({
    where: {
      id: Number.parseInt(quoteId),
    },
    include,
  });

  const CACHE_TTL = 60 * 5;

  try {
    await redis.set(cacheKey, JSON.stringify(quote), "EX", CACHE_TTL);
  } catch (error) {
    console.error("Redis write failed:", error);
  }

  return quote;
} catch (error) {
   log({
        level:"ERROR",

        file:"src/lib/quotes/getQuotes.js",

        operation:"Fetch Quote",

        message:"Failed to fetch quote.",

        error:error.message
    })
    throw error
}
};

export default getQuote;
