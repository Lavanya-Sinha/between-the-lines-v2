import prisma from "../prisma";
import redis from "../redis";
import log from "../logging/logger";

const getReflection = async (reflectionId) => {
  const cacheKey = `reflection:${reflectionId}`;

  try {
    const cachedReflection = await redis.get(cacheKey);

    if (cachedReflection) {
      console.log("Reflection Cache Hit");
      return JSON.parse(cachedReflection);
    }
  } catch (error) {
     log({
    level: "WARN",
    file: "src/lib/reflections/getReflection.js",
    operation: "Redis GET",
    message: "Failed to read reflection from cache.",
    error: error.message,
  });
  }

  console.log("Reflection Cache Miss");

  let reflection;

  try {
       reflection = await prisma.reflections.findUnique({
        where: {
          id: Number.parseInt(reflectionId),
        },
        include: {
          quote: {
            include: {
              book: true,
            },
          },
        },
      });
    
  } catch (error) {
      log({
        level:"ERROR",
        file:"src/lib/reflections/getReflection.js",
        operation:"Prisma Find Reflection",
        message:"Failed to retrieve reflection from database.",
        error:error.message
    })

    throw error
  }

  const CACHE_TTL = 60 * 5;

  try {
    await redis.set(cacheKey, JSON.stringify(reflection), "EX", CACHE_TTL);
  } catch (error) {
    log({
    level: "WARN",
    file: "src/lib/reflections/getReflection.js",
    operation: "Redis SET",
    message: "Failed to cache reflection.",
    error: error.message,
  });
  }

  return reflection;
};

export default getReflection;