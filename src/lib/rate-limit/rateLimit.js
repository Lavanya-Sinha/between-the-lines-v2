import redis from "../redis";

const rateLimit = async({prefix, key, limit, window})=>{
    const redisKey = `rate-limit:${prefix}:${key}`
    const count = await redis.incr(redisKey)
    //this particular command starts a counter and a stop watch at 
    // the same time working independently on the first request. 
    // Expires func sets the ttl as per the second parameter.
    console.log("Rate Limit Called");
console.log("Redis Key:", redisKey);
    if(count === 1){
    await redis.expire(redisKey, window)
    }
    console.log("Count:", count);
    console.log(await redis.keys("rate-limit:*"));
    const allowed = count <= limit
    const retryAfter = await redis.ttl(redisKey)
    return({
        allowed,
        count,
        remaining : Math.max(limit - count, 0),
        retryAfter
    })
}
export default rateLimit