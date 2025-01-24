import React from 'react';
import styles from './Chart.module.css';

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

  return (
    <div
      className={styles.chatbot}
      style={{
        border: `2px solid ${borderColor}`,
        borderRadius,
        fontFamily: font,
      }}
    >
      <div
        className={styles.title}
        style={{
          backgroundColor: titleBgColor,
        }}
      >
        <div className={styles.buttonIcon}></div>
        <span>Jinn Live - Demo Bot</span>
      </div>

      <div className={styles.chatArea}>
        <div className={styles.botMessage}>
          <div className={styles.buttonIcon}></div>
          <span
            style={{
              backgroundColor: botBubbleBg,
              color: botTextColor,
            }}
          >
            Hello! How can I assist you today?
          </span>
        </div>
        <div
          className={styles.userMessage}
          style={{
            backgroundColor: userBubbleBg,
            color: userTextColor,
          }}
        >
          I need some help.
        </div>
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ask us anything..."
          className={styles.input}
        />
        <button className={styles.sendButton}>
        ➤
        </button>
      </div>
    </div>
  );
};

export default ChatBot;