import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChatById } from '../ActionManager';
import { checkAuthStatus } from "../utils";
import { useNavigate } from "react-router-dom";

function ChatElement(){
  const [chatDetails, setChatDetails] = useState([]);
  const {chatId} = useParams();
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      if(authStatus)
        navigate("/app");
    }
    async function getChat(){
      await fetchAuthStatus();
      await getChatById(chatId).then(result=>{
        setChatDetails(result);
      });
      
    }
    getChat();
  },[chatId, navigate]);

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