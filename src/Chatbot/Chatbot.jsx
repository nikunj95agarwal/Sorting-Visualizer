import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";
import { FaBullseye } from "react-icons/fa";


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'incoming', text: 'Hi there! \nHave Sorting Algorithm Related Doubts?' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const chatboxRef = useRef(null);
  const chatInputRef = useRef(null);

  const API_KEY = 'AIzaSyDIl2tPfLtU6iVg70jbRzlvuPy7TxcbGsM'; // Replace with your actual API key

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add('show-chatbot');
    } else {
      body.classList.remove('show-chatbot');
    }

    return () => {
      body.classList.remove('show-chatbot');
    };
  }, [isOpen]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleChatInput = (e) => {
    setUserMessage(e.target.value);
    chatInputRef.current.style.height = 'auto';
    chatInputRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { type: 'outgoing', text: userMessage }];
    setMessages(newMessages);
    setUserMessage('');
    chatInputRef.current.style.height = 'auto';

    const incomingMessage = { type: 'incoming', text: 'Thinking...' };
    setMessages([...newMessages, incomingMessage]);

    try {
      const generatedResponse = await generateResponse(userMessage);
      incomingMessage.text = generatedResponse;
      setMessages([...newMessages, incomingMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      incomingMessage.text = "Oops! Something went wrong. Please try again.";
      setMessages([...newMessages, incomingMessage]);
    }
  };

  const generateResponse = async (message) => {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY,
        method: "post",
        data: {
          contents: [{ parts: [{ text: message }] }]
        }
      });
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error generating response:', error);
      return "Oops! Something went wrong. Please try again.";
    }
  };

  return (
    <>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span className="material-symbols-rounded">AskAI</span>
        <span className="material-symbols-outlined">Close</span>
      </button>
      <div className={`chatbot ${isOpen ? 'open' : ''}`}>
        <header>
          <h2>Chatbot</h2>
          <span className="close-btn material-symbols-outlined" onClick={toggleChatbot}>close</span>
        </header>
        <ul className="chatbox" ref={chatboxRef}>
          {messages.map((msg, index) => (
            <li key={index} className={`chat ${msg.type}`}>
              {msg.type === 'incoming' && (
                <span className="material-symbols-outlined"><FaBullseye style={{color:"black", marginTop:"8px"}} /></span>
              )}
              <p>{msg.text}</p>
            </li>
          ))}
        </ul>

        <div className="chat-input">
          <textarea
            ref={chatInputRef}
            placeholder="Ask Your Sorting Queries..."
            spellCheck="false"
            required
            value={userMessage}
            onChange={handleChatInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          ></textarea>
          <span
            id="send-btn"
            className="material-symbols-rounded"
            onClick={handleSendMessage}
          >
            <IoMdSend />
          </span>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
