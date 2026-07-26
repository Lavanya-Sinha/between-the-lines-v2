import http from "http"
import next from "next"
import { Server } from "socket.io"
import { setIO } from "./src/lib/socket.js"

const dev = process.env.NODE_ENV !== "production"

const app = next({dev})

const handler = app.getRequestHandler()

await app.prepare()

const server = http.createServer(handler)

const io = new Server(server)

setIO(io)

io.on("connection",(socket)=>{
    console.log("Client Connected: ", socket.id);
    
    socket.on("disconnect", ()=>{
        console.log("Client Disconnected:", socket.id);
    })

    socket.on("join-discussion",(discussionId)=>{
        socket.join(`discussion-${discussionId}`)
         console.log(`${socket.id} joined discussion ${discussionId}`);
    })

     socket.on("leave-discussion", (discussionId) => {
    socket.leave(`discussion-${discussionId}`);
     console.log(`${socket.id} left discussion ${discussionId}`);
  });
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});