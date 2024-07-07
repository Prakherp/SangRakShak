import React, { useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ chats }) => {
  const handleNewChat = () => {
    window.location.reload();
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
    const addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={handleNewChat}>
        New Chat
      </button>
      <div id="google_translate_element"></div>
      <ul className="chat-list">
        {chats.map((chat, index) => (
          <li key={index} className="chat-item">
            {chat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
