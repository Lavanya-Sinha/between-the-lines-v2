let io = null
console.log("socket.js loaded", import.meta.url);

export function setIO(socketServer){
     if (io) {
        console.log("setIO called");
        throw new Error("Socket.IO has already been initialized.");
    }
    io = socketServer
}
export function getIO(){
      console.log("getIO called, io =", io);
    if (!io) {
        throw new Error("Socket.IO has not been initialized.");
    }
    return io
}