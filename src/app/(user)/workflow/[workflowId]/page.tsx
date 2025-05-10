'use client';

import React, { useEffect, useState } from 'react';
import Settings from '@/components/ui/chat/Settings';
import Menu from '@/components/ui/chat/Menu';
import Main from '@/components/ui/chat/Main';
import { useConversations } from '@/hooks/useConversations';
import { useParams } from 'next/navigation';
import { Bars3Icon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { SelectModel } from '@/components/ui/chat/SelectModel';

const ChatPage = () => {
    const { workflowId } = useParams() as { workflowId: string };
    const { fetchConversations } = useConversations();
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white font-sans overflow-hidden">
      
      {/* Mobile Header Buttons */}
      <div className="flex md:hidden justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
        <button onClick={() => setShowMenu(true)} aria-label="Open menu">
          <Bars3Icon className="h-6 w-6 text-slate-700" />
        </button>
        <SelectModel/>
        <button onClick={() => setShowSettings(true)} aria-label="Open settings">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-slate-700" />
        </button>
      </div>

        {/* Sidebar Menu (left) */}
        <div className={`fixed md:static z-40 bg-slate-50 h-full transition-transform duration-300 md:translate-x-0 ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:w-[15vw] w-64`}>
            <Menu 
                className="h-full"
                conversationId={workflowId}
            />
        </div>

        {/* Backdrop for Menu */}
        {showMenu && (
            <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setShowMenu(false)} />
        )}

        {/* Main Chat Area */}
        <Main conversationId={workflowId}/>
      

      {/* Settings (right) */}
      <div className={`fixed md:static z-40 bg-slate-50 h-full top-0 right-0 transition-transform duration-300 transform ${showSettings ? 'translate-x-0' : 'translate-x-full'} w-80 md:w-[30vw] md:translate-x-0`}>
        <Settings 
            className="h-full"
            conversationId={workflowId}
        />
      </div>

      {/* Backdrop for Settings */}
      {showSettings && (
        <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default ChatPage;
