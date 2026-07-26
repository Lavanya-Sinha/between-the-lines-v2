import { getIO } from "./socket";

export function emitDiscussionMessageCreated(message) {
  const io = getIO();

  io.to(`discussion-${message.discussionId}`).emit(
    "discussion-message-created",
    message
  );
}