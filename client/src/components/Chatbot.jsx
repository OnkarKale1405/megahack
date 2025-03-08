import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  PaperAirplaneIcon,
  XMarkIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "http://localhost:5000/api/chatbot";

  // Initial Greeting
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { text: "Hello! How can I assist you?", sender: "bot" },
        { text: "🛍️ What can I get from FreshFood?", sender: "suggestion" },
      ]);
    }
  }, [open]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { text: messageText, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(BACKEND_URL, { message: messageText });

      setMessages((prev) => [
        ...prev,
        { text: res.data.message, sender: "bot" },
        ...res.data.suggestions.map((text) => ({ text, sender: "suggestion" })),
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response!", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg text-white hover:bg-blue-700 transition"
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>
      )}

      {open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed bottom-6 right-6 w-80 max-h-[500px] bg-white shadow-lg rounded-xl flex flex-col"
        >
          <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-xl">
            <h4 className="font-semibold">Chat with FreshFood AI</h4>
            <button onClick={() => setOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : msg.sender === "suggestion"
                    ? "bg-gray-200 text-black cursor-pointer hover:bg-gray-300"
                    : "bg-gray-300 text-black"
                }`}
                onClick={() =>
                  msg.sender === "suggestion" && sendMessage(msg.text)
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && <div className="text-gray-500">Thinking...</div>}
          </div>

          <div className="p-3 flex items-center border-t">
            <textarea
              className="flex-1 p-2 border rounded-lg outline-none resize-none h-12 max-h-32 overflow-auto"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button
              onClick={() => sendMessage(input)}
              className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;
