import prisma from "../prisma";
import redis from "../redis";
import log from "../logging/logger";

const getDoodle = async (quoteId) => {
  const cacheKey = `doodle:${quoteId}`;

  try {
    const cachedDoodle = await redis.get(cacheKey);

    if (cachedDoodle) {
      console.log("Doodle Cache Hit");
      return JSON.parse(cachedDoodle);
    }
  } catch (error) {
     log({
    level: "WARN",
    file: "src/lib/doodles/getDoodle.js",
    operation: "Redis GET",
    message: "Failed to read doodle from cache.",
    error: error.message
  })
  }

  console.log("Doodle Cache Miss");

  let doodle;

  try {
    doodle = await prisma.doodles.findUnique({
     where: {
       quote_id: Number(quoteId),
     },
   });
    
  } catch (error) {
      log({
        level:"ERROR",
        file:"src/lib/doodles/getDoodle.js",
        operation:"Prisma Find Doodle",
        message:"Failed to retrieve doodle from database.",
        error:error.message
    })
  }

  const CACHE_TTL = 60 * 5;

  try {
    await redis.set(cacheKey, JSON.stringify(doodle), "EX", CACHE_TTL);
  } catch (error) {
      log({
    level: "WARN",
    file: "src/lib/doodles/getDoodle.js",
    operation: "Redis SET",
    message: "Failed to cache doodle.",
    error: error.message,
  });
  }

  return doodle;
};

export default getDoodle;