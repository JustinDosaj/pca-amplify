'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../amplify/data/resource';

const ChatPage = () => {

  const [ message, setMessage ] = useState<string>('');
  const [ messageHistory, setMessageHistory] = useState<string[]>(['Fake Input']);
  const [ resMessage, setResMessage ] = useState<string[]>(['Fake Response']);
  const mergedMessages = [];
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const client = generateClient<Schema>({
    authMode: 'userPool',
  });

  const handleSubmit = async () => {

    try {
      const response = await client.queries.chatCompletion({message: 'test'})
      setResMessage((prev) => [...prev, response.data?.content || ''])
      setMessageHistory((prev) => [...prev, message])
      console.log(response.data?.content)
    } catch(error) {
      console.log(error)
    } finally {
      setMessage('')
    }

  }

    // Auto-scroll to bottom when messages update
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messageHistory, resMessage]);

    for (let i = 0; i < messageHistory.length; i++) {
      mergedMessages.push({ text: messageHistory[i], sender: 'user' });
  
      // Ensure there's a response available before adding it
      if (i < resMessage.length) {
        mergedMessages.push({ text: resMessage[i], sender: 'bot' });
      }
    }

  return (
    <div className="h-screen flex bg-white">
      {/* Left Sidebar */}
      <div className="w-[20vw] border-r border-gray-300 p-4">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul>
          <li className="p-2 bg-gray-100 rounded-lg mb-2">Option 1</li>
          <li className="p-2 bg-gray-100 rounded-lg mb-2">Option 2</li>
          <li className="p-2 bg-gray-100 rounded-lg">Option 3</li>
        </ul>
      </div>
      
      {/* Main Chat Section */}
      <div className="flex flex-col flex-1 bg-gray-50">
      {/* Chat Messages Section */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {mergedMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
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
            onClick={handleSubmit}
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

      {/* Right Sidebar */}
      <div className="w-[30vw] border-l border-gray-300 p-4">
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