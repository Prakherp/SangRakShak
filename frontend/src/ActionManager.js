import axios from 'axios';

export const CreateUser= async(userObject)=>{
  const url= process.env.REACT_APP_BACKEND_URL + '/tasks/createuser';
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  };

  const result = await fetch(url,options);
  const {success} = await result.json();
  if(success){
    console.log("Success");
  }
  else{
    console.log("Failed in creating User");
  }
};

export const EmailPresent = async(email)=>{
  const url= process.env.REACT_APP_BACKEND_URL + '/tasks/checkmail';
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
  const url= process.env.REACT_APP_BACKEND_URL + '/tasks/checkuserlogin';
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
  const url= process.env.REACT_APP_BACKEND_URL + '/login';
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
  const url= process.env.REACT_APP_BACKEND_URL + '/getchatnamesandid';
  const options={
    method: 'GET',
    credentials: 'include'
  }
  const result = await fetch(url,options);
  const resultJson=await result.json();
  if(resultJson.success=== true){
    return resultJson.chats; 
  }
  else  
    return [];
}

export const getChatById = async(chatId)=>{
  const url = process.env.REACT_APP_BACKEND_URL + '/tasks/getchatbyid';
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
  if(resultJson.success=== true)
    return resultJson.chatDetails;  
  else  
    return [-1];
}


export const getChatResponse = async(message)=>{
  try {
    const api_url = process.env.REACT_APP_PYTHON_BACKEND_URL;
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
    const url = process.env.REACT_APP_BACKEND_URL + '/tasks/updatechatbyid';
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
  const url = process.env.REACT_APP_BACKEND_URL + '/tasks/createchat';
    const options={
      method: 'GET',
      credentials: 'include'
    }
    const result = await fetch(url, options);
    const resultJson= await result.json();
    return resultJson;
}

export const renameChat = async(chatId, chatName)=>{
  const url = process.env.REACT_APP_BACKEND_URL + '/tasks/renamechat';
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
  const url = process.env.REACT_APP_BACKEND_URL + '/tasks/deletechat';
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

export const sendContactMail = async(email, message)=>{
  const data={
    email: email,
    message: message
  };
  const url = process.env.REACT_APP_BACKEND_URL + '/tasks/sendcontactmail';
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include',
  }
  fetch(url, options);
}