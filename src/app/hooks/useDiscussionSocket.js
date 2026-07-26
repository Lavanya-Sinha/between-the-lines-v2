"use client";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

export function useDiscussionSocket(discussionId) {
  const socketRef = useRef(null);
  const previousDiscussionRef = useRef(null);
  const router = useRouter();
  //for the socket connect-disconnect lifecycle
  useEffect(() => {
    const socket = io();
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
      });

      socket.on("discussion-message-created", () => {
        router.refresh();
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  //for the room creation-distruction lifecycle
   useEffect(() => {
    const socket = socketRef.current;

    if (!socket || !discussionId) return;

    if (previousDiscussionRef.current) {
      socket.emit("leave-discussion", previousDiscussionRef.current);
    }

    socket.emit("join-discussion", discussionId);

    previousDiscussionRef.current = discussionId;
  }, [discussionId]);
}
