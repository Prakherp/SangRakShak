import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { API_URL } from '../utils';
import { getChatNamesAndId } from '../ActionManager';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createChat, renameChat, deleteChat } from '../ActionManager';

const Sidebar = ({ handleChatClick }) => {
  const [currentChats, setCurrentChats] = useState([]);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [sidebarVisible, setSidebarVisible] = useState(true); // State for sidebar visibility
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
    <div>
      <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${!sidebarVisible ? 'hidden' : ''}`}>
        <button className="new-chat-btn" onClick={handleNewChat}>
          New Chat
        </button>
        <div id="google_translate_element"></div>
        <ul className="chat-list">
          {currentChats.map((chat, index) => (
            index === renameIndex ? 
            <li key={index}>
              <input
                type="text"
                placeholder={chat.chatName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameSubmit(chat._id, e.target.value);
                  }
                }}
              />
            </li>
            :
            <div key={index} className='chat-item-wrapper'>
              <Link to={`${chat._id}`}>
                <li className="chat-item">
                  {chat.chatName}
                </li>
              </Link>
              <button type="button" className="edit-icon-button" onClick={() => setRenameIndex(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"></path>
                </svg>
              </button>
              <button type="button" className="edit-icon-button" onClick={() => handleDeleteChat(chat._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                </svg>
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
