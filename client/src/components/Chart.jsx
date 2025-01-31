import React, { useState } from "react";
import styles from "./Chart.module.css";
import { queryChatbot } from "../services/api";

const ChatBot = ({ config }) => {
  const {
    borderColor,
    borderRadius,
    titleBgColor,
    botBubbleBg,
    botTextColor,
    userBubbleBg,
    userTextColor,
    font,
  } = config;

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me anything about the document." },
  ]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle User Query Submission
  const handleSendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages([...messages, userMessage]);

    setQuery("");
    setLoading(true);

    try {
      const botResponses = await queryChatbot(query);

      console.log(botResponses)
      
      // Pick the most relevant response
      const botMessage = botResponses.length > 0 
        ? botResponses[0].text 
        : "I couldn't find relevant information in the document.";

      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botMessage }]);
    } catch (error) {
      setMessages([...messages, { sender: "bot", text: "Error processing your query. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.chatbot}
      style={{
        border: `2px solid ${borderColor}`,
        borderRadius,
        fontFamily: font,
      }}
    >
      <div className={styles.title} style={{ backgroundColor: titleBgColor }}>
        <span>Jinn Live - Demo Bot</span>
      </div>

      <div className={styles.chatArea}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "bot" ? styles.botMessage : styles.userMessage}
            style={{
              backgroundColor: msg.sender === "bot" ? botBubbleBg : userBubbleBg,
              color: msg.sender === "bot" ? botTextColor : userTextColor,
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ask me about the document..."
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.sendButton} onClick={handleSendMessage} disabled={loading}>
          {loading ? "..." : "➤"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
