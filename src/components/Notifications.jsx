import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { PORTURL } from "../services/common";

const socket = io(PORTURL);

const Notifications = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for response from the server
    socket.on("response", (data) => {
      console.log("Response received from server:", data);
      setCurrentMessage(data);
    });

    // Cleanup on unmount
    return () => {
      socket.off("message");
      socket.off("response");
    };
  }, []);

  // Event handler to send message to backend
  const sendMessage = (type) => {
    const message = {
      type,
      text: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
    };

    // Emit message to backend
    socket.emit("message", message);
  };

  return (
    <div>
      {/* Heading Section */}
      <div className="grid grid-cols-1 gap-4 transition-[grid-template-columns] lg:grid-cols-[1fr_120px] lg:gap-8 lg:[&:has(>*:last-child:hover)]:grid-cols-[1fr_160px]">
        <div className="h-32 flex items-center justify-center rounded-lg bg-blue-600 text-white text-2xl font-semibold">
          Notification Dashboard
        </div>
        <div className="h-32 rounded-lg bg-gray-200"></div>
      </div>

      {/* Notification Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-8">
        <div
          className="h-32 rounded-lg bg-green-200 flex items-center justify-center text-green-800 font-medium cursor-pointer"
          onClick={() => {
            sendMessage("success");
            setCurrentMessage(null); // Clear currentMessage when sending a new message
          }}
        >
          Success Notification
        </div>
        <div
          className="h-32 rounded-lg bg-red-200 flex items-center justify-center text-red-800 font-medium cursor-pointer"
          onClick={() => {
            sendMessage("error");
            setCurrentMessage(null); // Clear currentMessage when sending a new message
          }}
        >
          Error Notification
        </div>
        <div
          className="h-32 rounded-lg bg-yellow-200 flex items-center justify-center text-yellow-800 font-medium cursor-pointer"
          onClick={() => {
            sendMessage("warning");
            setCurrentMessage(null); // Clear currentMessage when sending a new message
          }}
        >
          Warning Notification
        </div>
        <div
          className="h-32 rounded-lg bg-blue-200 flex items-center justify-center text-blue-800 font-medium cursor-pointer"
          onClick={() => {
            sendMessage("info");
            setCurrentMessage(null); // Clear currentMessage when sending a new message
          }}
        >
          Information Notification
        </div>
        <div
          className="h-32 rounded-lg bg-gray-300 flex items-center justify-center text-gray-900 font-medium cursor-pointer"
          onClick={() => {
            sendMessage("general");
            setCurrentMessage(null); // Clear currentMessage when sending a new message
          }}
        >
          General Notification
        </div>
        <div
          className="h-32 rounded-lg bg-purple-200 flex items-center justify-center text-purple-800 font-medium cursor-pointer"
          onClick={() => {
            sendMessage("additional");
            setCurrentMessage(null); // Clear currentMessage when sending a new message
          }}
        >
          Additional Notification
        </div>
      </div>

      {/* Display Current Message */}
      <div className="mt-8">
        {currentMessage && (
          <div
            className={`p-4 rounded-lg my-2 text-center ${
              currentMessage.type === "success"
                ? "bg-green-200 text-green-800"
                : currentMessage.type === "error"
                ? "bg-red-200 text-red-800"
                : currentMessage.type === "warning"
                ? "bg-yellow-200 text-yellow-800"
                : currentMessage.type === "info"
                ? "bg-blue-200 text-blue-800"
                : currentMessage.type === "general"
                ? "bg-gray-300 text-gray-900"
                : "bg-purple-200 text-purple-800"
            }`}
          >
            {currentMessage.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
