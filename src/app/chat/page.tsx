'use client';

import React from 'react';

const ChatPage = () => {
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
      <div className="flex-1 p-4 border-r border-gray-300 bg-gray-50 shadow-md flex flex-col">
        <div className="flex-grow overflow-auto p-4">
          {/* Messages will go here */}
        </div>
        <div className="mt-auto flex items-center border border-gray-300 rounded-full overflow-hidden p-1">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border-none focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 hover:cursor-pointer">
            Send
          </button>
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