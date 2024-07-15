import React, { useState, useEffect } from 'react';
import axios from 'axios';
import formatResponse from './FormatResponse';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import './ChatApp.css';
import { checkAuthStatus } from '../utils';
import { useNavigate } from 'react-router-dom';

function ChatApp({ changeIsAuthenticated, handleLogout }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isAuthenticated, setIsAuthenticatedLocal] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticatedLocal(authStatus);
      changeIsAuthenticated(authStatus);  // Update parent state
    };
    fetchAuthStatus();
  }, [changeIsAuthenticated]);


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
  const test = [{
    user_id: "jkashdjas",
    "chat_1": [{
      question: "Question1",
      answer: "Answer1 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{
      question: "Question2",
      answer: "Answer2 - It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }],
    "chat_2": [{
      question: "Question1",
      answer: "Answer1"
    },{
      question: "Question2",
      answer: "Answer2"
    }]
  }];

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return isAuthenticated ? (
    <div className="app">
      <Sidebar chats={chats} />
      <div className="container">
        <span>
        <h1 className='heading'>SangRakshak</h1>
        <button onClick={()=>handleLogout()} >
        Logout
      </button>
      </span>
        <div className="chatbox">
          {test[0]["chat_1"].map((chat, index) => (
            <div key={index} className={`message`}>
              <p className='question'>{chat.question}</p>
              <p className='answer'>{chat.answer}</p>
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
  ) :
  (
    navigate("/login")
  );
}

export default ChatApp;
