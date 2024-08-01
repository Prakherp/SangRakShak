import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import './ChatApp.css';
import { checkAuthStatus, API_URL } from '../utils';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { getChatResponse, getChatById, updateChatById, createChat } from '../ActionManager';
import formatResponse from './FormatResponse';
import IntroPage from './Introduction_ChatPage';


function ChatApp({ changeIsAuthenticated, handleLogout }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isAuthenticated, setIsAuthenticatedLocal] = useState(null);
  const [allowChat, setAllowChat] = useState(true);
  const [currentChat, setCurrentChat] = useState([]);
  const navigate=useNavigate();
  let {chatId} = useParams();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticatedLocal(authStatus);
      changeIsAuthenticated(authStatus);  // Update parent state
    };
    fetchAuthStatus();
    const updateChat = async ()=>{
      console.log("Chat update");
      if(chatId){
        await getChatById(chatId).then(result=>{
          setChatHistory(result);
        })
        setCurrentChat([]);
      }
    }
    updateChat();
  }, [changeIsAuthenticated, chatId]);


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

  const checkForChatId = async ()=>{
    if (!chatId) {
      await createChat().then(result => {
        console.log("result->", result);
        if (result.success === true) {
          navigate(`${result.chatId}`);
        }
        chatId = result.chatId;
      });
    }
  }

  const addQuestion = ()=>{
    setCurrentChat((prevChat) => [...prevChat, message]);
    setAllowChat(false);
    setMessage("");
    console.log("Current Chats1->",currentChat);
  }

  const sendMessage = async () => {
    await checkForChatId();
    console.log("chatId->", chatId);
  
    try {
      const saveMessage = message;
      
      await addQuestion();
  
      const response = await getChatResponse(saveMessage);
  
      // Ensure the response is added after the message
      setCurrentChat((prevChat) => [...prevChat, response]);
  
      await updateChatById(chatId, {
        question: saveMessage,
        answer: response,
      });
    } catch (error) {
      console.error("Error fetching chat response:", error);
    } finally {
      setAllowChat(true);
    }
  };

  const updateChatHistory = (history)=>{
    setChatHistory(history);
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

  const handleChatClick = async(chatId)=>{

  }

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return isAuthenticated ? (
    <div className="app">
      <Sidebar handleChatClick={handleChatClick} />
      <div className="container">
        <span>
          <h1 className='heading'>SangRakshak</h1>
          <button className='logout-btn'onClick={()=>handleLogout()} >
          Logout
          </button>
        </span>
        
        {!chatId ? <IntroPage /> :
          (<>
            <div className="chatbox">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`message`}>
                  <p className='question'>{chat.question}</p>
                  <p className='answer'>{formatResponse(chat.answer)}</p>
                </div>
              ))}
              {
                currentChat.map((chat,index)=>(
                  <div key={index} className={`message`}>
                    {/* <p className={index%2===0 ? "question": "answer"}>{chat}</p> */}
                    {index%2==0 ? <p className="question">{chat}</p> : <p className='answer'>{formatResponse(chat)}</p>}
                  </div>
                ))
              }
            </div>

            <div className="input-container">
              <input
                type="text"
                value={message}
                placeholder='Message SangRakshak'
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (allowChat && e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage} disabled ={!allowChat}>Send</button>
              <div className="mic-icon" onClick={handleSpeechRecognition}>
                <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
              </div>
            </div>
          </>)
        }
      </div>
    </div>
  ) :
  (
    navigate("/login")
  );
}

export default ChatApp;
