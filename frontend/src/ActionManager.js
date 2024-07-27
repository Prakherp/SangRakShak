import { API_URL } from './utils';
import axios from 'axios';
import formatResponse from './components/FormatResponse';

require('dotenv').config();

export const CreateUser= async(userObject)=>{
  const url= `${API_URL}/tasks/createuser`;
  console.log(url);
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  };

  const result = await fetch(url,options);
  console.log(result);
  const {success,message} = await result.json();
  if(success){
    console.log("Success");
    console.log(message);
  }
  else{
    console.log("Failed in creating User");
    console.log(message);
  }
};

export const EmailPresent = async(email)=>{
  const url= `${API_URL}/tasks/checkmail`;
  console.log(url);
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email})
  };

  const result = await fetch(url,options);
  // console.log("Result check", result.json());
  const {present} = await result.json();
  // console.log("Presence check", present);
  if(result.status === 200){
    // console.log("In status 200");
    if(present) return 1;
    else  return 0;
  }
  else{
    return -1;
  }
};


export const checkUserLogin = async (data)=>{
  const url= `${API_URL}/tasks/checkuserlogin`;
  console.log(url);
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const result = await fetch(url,options);
  const resultJson=await result.json();
  return resultJson;
}



export const logInLocal = async (data)=>{
  const url= `${API_URL}/login`;
  console.log(url);
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  };
  const result = await fetch(url,options);
  const resultJson=await result.json();
  return resultJson;
}

export const getChatNamesAndId = async ()=>{
  const startTime = Date.now();
  const url= `${API_URL}/getchatnamesandid`;
  console.log(url);
  const options={
    method: 'GET',
    credentials: 'include'
  }
  const st = Date.now();
  const result = await fetch(url,options);
  const resultJson=await result.json();
  const end = Date.now();
  console.log(`get JSON with fetch time: ${end - st}ms`);
  console.log(resultJson);
  if(resultJson.success=== true){
    const endTime = Date.now();
    console.log(`get chat front-end time: ${endTime - startTime}ms`);
    return resultJson.chats; 
  }
  else  
    return [];
}

export const getChatById = async(chatId)=>{
  const url = `${API_URL}/tasks/getchatbyid`;
  console.log(url);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({chatId: chatId}),
    credentials: 'include'
  }
  const result = await fetch(url,options);
  const resultJson=await result.json();
  console.log(resultJson);
  if(resultJson.success=== true)
    return resultJson.chatDetails;  
  else  
    return [];
}


export const getChatResponse = async(message)=>{
  try {
    const api_url = 'http://127.0.0.1:5000/get-answer';
    const data = { question: message };
    const response = await axios.post(api_url, data);
    
    // const formattedResponse = await formatResponse(response.data);

    return response.data;

  } catch (error) {
    console.error('Error:', error);
  }
}

export const updateChatById = async(chatId, chatObject)=>{
  try{
    const url = `${API_URL}/tasks/updatechatbyid`;
    console.log(url);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({chatId: chatId, chatObject: chatObject}),
      credentials: 'include'
    }
    const result = await fetch(url,options);
    const resultJson=await result.json();
    return resultJson.success;
  }catch(err){
    console.error(err);
  }
}

export const createChat = async()=>{
  const url = `${API_URL}/tasks/createchat`;
    console.log(url);
    const options={
      method: 'GET',
      credentials: 'include'
    }
    const result = await fetch(url, options);
    const resultJson= await result.json();
    return resultJson;
}

export const renameChat = async(chatId, chatName)=>{
  const url = `${API_URL}/tasks/renamechat`;
    console.log(url);
    const options={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({chatId: chatId, chatName: chatName}),
      credentials: 'include',
    }
    const result = await fetch(url, options);
    const resultJson= await result.json();
    return resultJson;
}

export const deleteChat = async(chatId)=>{
  const url = `${API_URL}/tasks/deletechat`;
    console.log(url);
    const options={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({chatId: chatId}),
      credentials: 'include',
    }
    const result = await fetch(url, options);
    const resultJson= await result.json();
    return resultJson;
}