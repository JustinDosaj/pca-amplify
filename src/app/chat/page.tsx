'use client';

import React, { useState, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import axios from 'axios'

const ChatPage = () => {

  const [ message, setMessage ] = useState<string>('')

  useEffect(() => {

    const chat = async () => {
      const response = await axios.get('https://e5tmvoq025.execute-api.us-west-1.amazonaws.com/dev/amplify-pcaamplify-jcdos--chatcompletionlambda24BC-cCgl9mvjnjU3')
      console.log(response)
    }

    chat();

  },[])

  return (
    <div className="h-screen flex bg-white">
      {/* Left Sidebar */}
      <div className="w-[14vw] border-r border-gray-300 p-4">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul>
          <li className="p-2 bg-gray-100 rounded-lg mb-2">Option 1</li>
          <li className="p-2 bg-gray-100 rounded-lg mb-2">Option 2</li>
          <li className="p-2 bg-gray-100 rounded-lg">Option 3</li>
        </ul>
      </div>
      
      {/* Main Chat Section */}
      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-auto p-4">
          {/* Messages will go here */}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-300 bg-white shadow-md">
          <div className="flex items-center border border-gray-300 rounded-2xl p-2 bg-gray-100 w-full focus-within:ring-2 focus-within:ring-blue-500">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={1}
              placeholder="Type a message..."
              className="flex-1 resize-none border-none bg-transparent outline-none p-2 text-gray-800 focus:ring-0"
            />
            <button
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim()}
            >
              <PaperAirplaneIcon className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[20vw] border-l border-gray-300 p-4">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <ul>
          <li className="p-2 bg-gray-100 rounded-lg mb-2">User 1</li>
          <li className="p-2 bg-gray-100 rounded-lg mb-2">User 2</li>
          <li className="p-2 bg-gray-100 rounded-lg">User 3</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;