import requireUser from "./requireUser";
import rateLimit from "../rate-limit/rateLimit";

const requireSearchAccess = async () => {
  const user = await requireUser();

  const searchRateLimit = await rateLimit({
    prefix: "search",
    key: `user:${user.id}`,
    limit: 60,
    window: 60,
  });

  if (!searchRateLimit.allowed) {
    throw new Error(
      `Too many search requests. Try again in ${searchRateLimit.retryAfter} seconds.`
    );
  }

  return user;
};

export default requireSearchAccess;