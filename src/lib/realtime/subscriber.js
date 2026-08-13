import redis from "../redis.js";

const subscriber = redis.duplicate();

export async function startSubscriber(io) {
  await subscriber.subscribe("realtime-events");

  console.log("✅ Listening for realtime events...");

subscriber.on("message", (channel, message) => {
    const event = JSON.parse(message);

    console.log("Channel:", channel);
    console.log("Event:", event);

io.to(event.room).emit(
    event.type,
    event.payload
);
});
}