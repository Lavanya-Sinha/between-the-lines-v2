"use client";

import { createContext, useContext, useEffect } from "react";
import socket from "@/lib/socketClient";

const SocketContext = createContext(socket);

export function useSocket() {
    return useContext(SocketContext);
}

export default function QuoteRealtimeProvider({
    quoteId,
    children,
}) {
    useEffect(() => {
          console.log("Provider quoteId:", quoteId);
        const room = `quote-${quoteId}`;

        socket.emit("join-room", room);

        console.log("Joined", room);

        return () => {
             console.log("Leaving", room);
            socket.emit("leave-room", room);
        };
    }, [quoteId]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}