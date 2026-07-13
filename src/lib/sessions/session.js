import redis from "../redis";

const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days

export const createSession = async(sessionId, userId)=>{
await redis.set(
    `session:${sessionId}`,
    userId,
    "EX",
    SESSION_TTL
)
}

export const getSession = async(sessionId)=>{
   return await redis.get(`session:${sessionId}`)
}

export const deleteSession = async(sessionId)=>{
    return await redis.del(`session:${sessionId}`)
}