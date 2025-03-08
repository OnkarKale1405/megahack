import React from "react";
import { Outlet } from "react-router-dom";
import Chatbot from "../components/Chatbot";

const ChatbotLayout = () => {


    return (
        <div className="relative min-h-screen">
            <Outlet />

            <div className="fixed bottom-4 right-4">
                <Chatbot />
            </div>
        </div>
    );
};

export default ChatbotLayout;
