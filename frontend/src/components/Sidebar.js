import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getChatNamesAndId, createChat, renameChat, deleteChat } from '../ActionManager';

const Sidebar = ({ handleChatClick }) => {
  const [currentChats, setCurrentChats] = useState([]);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const getNames = async () => {
    const result = await getChatNamesAndId();
    setCurrentChats(result);
  };

  const handleNewChat = async () => {
    createChat().then(result => {
      if (result.success) {
        getNames();
        navigate(`${result.chatId}`);
      }
    });
  };

  const handleRenameSubmit = async (chatId, value) => {
    await renameChat(chatId, value);
    getNames();
    setRenameIndex(-1);
  };

  const handleDeleteChat = async (chatId) => {
    await deleteChat(chatId);
    getNames();
  };

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        autoDisplay: false
      },
      'google_translate_element'
    );
  };

  useEffect(() => {
    getNames();
    const addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex bg-base-100 text-white">
      <button 
        className="fixed top-2 left-2 z-50 p-2 bg-gray-800 rounded focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <div 
        className={`sidebar bg-base-100 text-white p-4 h-full ${!sidebarVisible ? 'hidden' : 'block'} fixed top-0 left-0 z-40 w-64 overflow-y-auto`}
      >
        <div className="flex flex-col items-center mt-5">
          <button className="btn btn-neutral w-40 my-4 hover:bg-blue-500 transition-transform transform hover:scale-105 duration-300 ease-in-out" onClick={handleNewChat}>
            New Chat
          </button>
        </div>
        <div id="google_translate_element" className="mb-4"></div>
        <ul className="menu bg-gray-800 w-full">
          {currentChats.map((chat, index) => (
            index === renameIndex ? 
            <li key={index} className="mb-4">
              <input
                type="text"
                placeholder={chat.chatName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameSubmit(chat._id, e.target.value);
                  }
                }}
                className="input input-bordered w-full rounded-lg border-gray-600 bg-gray-900 text-white truncate"
                style={{ width: '100%' }}
              />
            </li>
            :
            <div key={index} className="chat-item-wrapper flex items-center justify-between mb-4 w-full">
              <Link to={`${chat._id}`} className="w-full">
                <li className="chat-item btn btn-outline w-full text-left truncate overflow-hidden whitespace-nowrap">
                  {chat.chatName.length > 5 ? chat.chatName.substring(0,5) + '...' : chat.chatName}
                </li>
              </Link>
              <button type="button" className="btn btn-sm btn-outline mx-1" onClick={() => setRenameIndex(index)}>
                ✏️
              </button>
              <button type="button" className="btn btn-sm btn-outline mx-1" onClick={() => handleDeleteChat(chat._id)}>
                🗑️
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
