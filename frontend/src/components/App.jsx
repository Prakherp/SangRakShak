import React, { useState } from 'react';
import axios from 'axios';
import FormatResponse from './FormatResponse';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const api_url = 'http://127.0.0.1:5000/get-answer';
      const data = { "question" : message };
      const response = await axios.post(api_url, data);
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1 id="heading">Sangrakshak</h1>
      <div>
        <p className='bot-message'>{FormatResponse(response)}</p>
      </div>
      <div>
        <div className='input-container'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      
    </div>
  );
}

export default App;