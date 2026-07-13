import prisma from "../prisma";
import redis from "../redis";

const getDoodle = async (quoteId) => {
  const cacheKey = `doodle:${quoteId}`;

  try {
    const cachedDoodle = await redis.get(cacheKey);

    if (cachedDoodle) {
      console.log("Doodle Cache Hit");
      return JSON.parse(cachedDoodle);
    }
  } catch (error) {
    console.error("Redis read failed:", error);
  }

  console.log("Doodle Cache Miss");

  const doodle = await prisma.doodles.findUnique({
    where: {
      quote_id: Number(quoteId),
    },
  });

  const CACHE_TTL = 60 * 5;

  try {
    await redis.set(cacheKey, JSON.stringify(doodle), "EX", CACHE_TTL);
  } catch (error) {
    console.error("Redis write failed:", error);
  }

  return doodle;
};

export default getDoodle;