import React, { useState, useEffect } from 'react';
import axios from 'axios';
import formatResponse from './FormatResponse';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import './ChatApp.css';

function ChatApp() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setMessage(speechToText);
      };
      setRecognition(recognitionInstance);
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }, []);

  const sendMessage = async () => {
    try {
      const api_url = 'http://127.0.0.1:5000/get-answer';
      const data = { question: message };
      const response = await axios.post(api_url, data);
      const newChat = { user: 'User', message: message };
      const newBotResponse = { user: 'Sangrakshak', message: formatResponse(response.data) };
      setChatHistory([...chatHistory, newChat, newBotResponse]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSpeechRecognition = () => {
    if (recognition) {
      if (!isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
      setIsListening(!isListening);
    }
  };

  const [chats] = useState(['Chat 1', 'Chat 2', 'Chat 3']);

  return (
    <div className="app">
      <Sidebar chats={chats} />
      <div className="container">
        <h1 className='heading'>SangRakshak</h1>
        <div className="chatbox">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`message ${chat.user.toLowerCase()}-message`}>
              <p>{chat.user}: {chat.message}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={message}
            placeholder='Message SangRakshak'
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
          <div className="mic-icon" onClick={handleSpeechRecognition}>
            <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
