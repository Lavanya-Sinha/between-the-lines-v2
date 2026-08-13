import redis from "../redis.js";

const publisher = redis.duplicate();

export async function publishRealtimeEvent({
  room,
  type,
  payload,
}) {
  const event = {
    room,
    type,
    payload,
  };

  await publisher.publish(
    "realtime-events",
    JSON.stringify(event)
  );

  console.log("📢 Publishing", {
  room,
  type,
});
}