import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ScrollArea } from "./ui/scroll-area";
import "./ChatApp.css"; // Assuming you will add your styles in this file

const topics = [
  "Ratios and Proportions Homework",
  "Algebra 101",
  "Trigonometry Problem",
  "Exponential Functions Homework",
  "Ratios Problem",
  "Calculus Homework",
];

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { text: "Hey! Your teacher wanted us to go over some problems.", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Great question! Let's break it down.", sender: "ai" },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Math 314</h2>
        <ul className="topics-list">
          {topics.map((topic) => (
            <li
              key={topic}
              className={`topic-item ${selectedTopic === topic ? "selected" : ""}`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        <div className="chat-header">
          <h2>{selectedTopic}</h2>
        </div>
        <ScrollArea className="messages-container">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "ai" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`message ${msg.sender === "ai" ? "ai-message" : "user-message"}`}
            >
              {msg.text}
            </motion.div>
          ))}
        </ScrollArea>
        <div className="input-area">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="input-field"
          />
          <Button onClick={handleSend} className="send-button">Send</Button>
        </div>
      </div>
    </div>
  );
}