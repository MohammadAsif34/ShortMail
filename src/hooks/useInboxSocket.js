import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewInboxMail } from "../redux/emailSlice";
import { useRef } from "react";

export const useInboxSocket = (isInbox) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((s) => s.user.data?.email);
  const token = useSelector((s) => s.auth.token);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!userEmail || !token || !isInbox) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      return;
    }
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("connected");
      socket.send(
        JSON.stringify({ type: "JOIN", email: userEmail, token: token })
      );
    };

    socket.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      if (data.type === "NEW_EMAIL") {
        dispatch(addNewInboxMail(data.mail));
      }
    };

    socket.onerror = (err) => console.log("WS Error : ", err);
    socket.onclose = () => console.log("WS closed");
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [userEmail, token, isInbox]);
};
