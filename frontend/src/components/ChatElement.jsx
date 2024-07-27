import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChatById } from '../ActionManager';

function ChatElement(){
  const [chatDetails, setChatDetails] = useState([]);
  const {chatId} = useParams();

  useEffect(()=>{
    async function getChat(){
      await getChatById(chatId).then(result=>{
        setChatDetails(result);
      });
      
    }
    getChat();
  },[chatId]);

  return (
    <>
      {chatDetails.map((chat, index) => (
        <div key={index} className={`message`}>
          <p className='question'>{chat.question}</p>
          <p className='answer'>{chat.answer}</p>
        </div>
      ))}
    </>
  );
}

export default ChatElement;