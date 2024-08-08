import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { checkAuthStatus } from '../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { getChatResponse, getChatById, updateChatById, createChat } from '../ActionManager';
import formatResponse from './FormatResponse';
import IntroPage from './Introduction_ChatPage';

function ChatApp({ handleLogout }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isAuthenticated, setIsAuthenticatedLocal] = useState(null);
  const [allowChat, setAllowChat] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messageRef = useRef(null);
  const navigate = useNavigate();
  let { chatId } = useParams();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      if (!authStatus) navigate("/login");
      setIsAuthenticatedLocal(authStatus);
    };

    const updateChat = async () => {
      await fetchAuthStatus();
      if (isAuthenticated && chatId) {
        await getChatById(chatId).then(result => {
          if (result.length === 1 && result[0] === -1) {
            navigate("/app");
          } else {
            setChatHistory(result);
          }
        });
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };
    updateChat();
  }, [ chatId, isAuthenticated, navigate]);

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

  const checkForChatId = async () => {
    if (!chatId) {
      await createChat().then(result => {
        if (result.success === true) {
          navigate(`${result.chatId}`);
        }
        chatId = result.chatId;
      });
    }
  };

  const addQuestion = (question) => {
    setChatHistory((prevChat) => [...prevChat, { question }]);
    //setCurrentQuestions((prevQuestions) => [...prevQuestions, question]);
    setAllowChat(false);
    setMessage('');
  };

  const addAnswer = (answer) => {
    setChatHistory((prevChat) => {
      const lastItem = prevChat.pop();
      return [...prevChat, { ...lastItem, answer }];
    });
    //setCurrentAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  const sendMessage = async () => {
    if(message.trim()==="")
        return;
    await checkForChatId();

    try {
      const saveMessage = message;

      addQuestion(saveMessage);
      setIsLoading(true);
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      const response = await getChatResponse(saveMessage);
      setIsLoading(false);
      addAnswer(response);

      if(response.trim()!==""){
        await updateChatById(chatId, {
          question: saveMessage,
          answer: response,
        });
      }
    } catch (error) {
      console.error('Error fetching chat response:', error);
    } finally {
      setAllowChat(true);
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

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (messageRef.current) {
      messageRef.current.style.height = 'auto';
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <div className="min-h-screen bg-gray-800 flex flex-col lg:flex-row items-center justify-center py-12 px-4 animate-fade-in">
      <div className="flex lg:flex-row">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow p-6 lg:ml-64 w-full lg:w-auto">
        <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-gray-800 z-10 border-b border-gray-700 text-white">
          <div className="flex-grow"></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-white lg:flex-grow lg:ml-64">
            SANGRAKSHAK
          </h1>
          <div className="flex-grow flex justify-end">
            <button className="btn btn-neutral w-30 hover:bg-blue-500 transition-transform transform hover:scale-105 duration-300 ease-in-out" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="min-h-screen flex flex-col flex-grow mt-20 overflow-y-auto pb-24 bg-gray-800">
          {!chatId ? (
            <IntroPage />
          ) : (
            <>
              <div className="flex flex-col flex-grow overflow-y-auto bg-gray-800 rounded-lg p-4 max-w-4xl mx-auto">
                {chatHistory.map((chat, index) => (
                  <div key={index} className="mb-4">
                    <p className="bg-gray-400 text-base-100 p-4 rounded-lg border border-white text-right">
                      <span className="font-bold">User:</span> {chat.question}
                    </p>

                    {chat.answer && (<div>
                      <div className="bg-white text-base-100 p-4 rounded-lg mt-2 border border-gray-300">{formatResponse('Sangrakshak :'+chat.answer)}</div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && <p className="bg-white text-base-100 p-4 rounded-lg mt-2 border border-gray-300"><span className="loading loading-dots loading-lg"></span></p>}
              </div>
              <div className="flex fixed bottom-0 left-0 right-0 bg-gray-800 p-4 justify-center">
                <div className="flex items-center justify-center w-full lg:max-w-4xl mx-auto lg:ml-80">
                  <textarea
                    ref={messageRef}
                    className="textarea textarea-bordered w-full lg:max-w-3xl bg-gray-200 text-black"
                    value={message}
                    placeholder="Type here"
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (allowChat && e.key === 'Enter' && !e.shiftKey) {
                        if (messageRef.current) {
                          messageRef.current.style.height = 'auto';
                          messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
                        }
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    rows={1} // Set an initial number of rows
                    style={{ resize: 'none' }} // Disable manual resizing
                  ></textarea>
                  <button className="btn btn-primary w-38 ml-2 hover:bg-blue-500 transition-transform transform hover:scale-105 duration-300 ease-in-out" onClick={sendMessage} disabled={!allowChat}>Send</button>
                  <div className="ml-2" onClick={handleSpeechRecognition}>
                    <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  ) : (
    navigate("/login")
  );
}

export default ChatApp;