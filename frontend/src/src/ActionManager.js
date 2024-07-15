import { API_URL } from './utils';

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