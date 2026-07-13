import requireUser from "./requireUser";
import rateLimit from "../rate-limit/rateLimit";

const requireWriteAccess = async()=>{
const user = await requireUser()

const writeRateLimit = await rateLimit({
    prefix: "write",
    key: `user:${user.id}`,
    limit: 60,
    window: 60
})
  if (!writeRateLimit.allowed) {
    throw new Error(
      `Too many write operations. Try again in ${writeRateLimit.retryAfter} seconds.`
    );
}
return user
}
export default requireWriteAccess