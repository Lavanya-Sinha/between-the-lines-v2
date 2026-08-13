let io = null;

const INSTANCE_ID = Math.random().toString(36).slice(2);

console.log("socket.js loaded");
console.log("INSTANCE:", INSTANCE_ID);

export function setIO(socketServer) {
    console.log("setIO on", INSTANCE_ID);

    if (io) {
        throw new Error("Socket.IO has already been initialized.");
    }

    io = socketServer;

    console.log("Socket.IO initialized");
}

export function getIO() {
    console.log("getIO on", INSTANCE_ID, io);

    if (!io) {
        throw new Error("Socket.IO has not been initialized.");
    }

    return io;
}