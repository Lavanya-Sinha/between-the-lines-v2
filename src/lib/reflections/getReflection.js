import prisma from "../prisma";
import redis from "../redis";

const getReflection = async (reflectionId) => {
  const cacheKey = `reflection:${reflectionId}`;

  try {
    const cachedReflection = await redis.get(cacheKey);

    if (cachedReflection) {
      console.log("Reflection Cache Hit");
      return JSON.parse(cachedReflection);
    }
  } catch (error) {
    console.error("Redis read failed:", error);
  }

  console.log("Reflection Cache Miss");

  const reflection = await prisma.reflections.findUnique({
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

  const CACHE_TTL = 60 * 5;

  try {
    await redis.set(cacheKey, JSON.stringify(reflection), "EX", CACHE_TTL);
  } catch (error) {
    console.error("Redis write failed:", error);
  }

  return reflection;
};

export default getReflection;