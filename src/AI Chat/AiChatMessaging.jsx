import React, { useState, useEffect, useRef } from 'react';
import {  Bot, MoreVertical, UserCircle2, Loader } from 'lucide-react';
import { chatData } from '../context/AIChatContext';
import { LuSendHorizonal } from "react-icons/lu";


const ModernAIChatMessaging = () => {
  const { fetchResponse, messages, prompt, setPrompt, newRequestLoading, loading, chats } = chatData();
  const messageContainerRef = useRef();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 mt-1">
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6 text-indigo-600" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
            <p className="text-sm text-gray-500">Always here to help</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Container */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      >
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="space-y-6">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none px-5 py-3 shadow-sm">
                    <p className="text-sm">{message.question}</p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <UserCircle2 className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="flex-shrink-0 mt-1">
                    <Bot className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm border border-gray-100">
                    <p 
                      className="text-sm prose prose-sm"
                      dangerouslySetInnerHTML={{ __html: message.answer }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-sm">Start a conversation...</p>
          </div>
        )}

        {/* Typing Indicator */}
        {newRequestLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 mt-1">
                <Bot className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none px-5 py-3 shadow-sm border border-gray-100">
                <TypingIndicator />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      {chats && chats.length !== 0 && (
        <div className="bg-white border-t border-gray-200 p-4 ">
          <form onSubmit={submitHandler} className=" mx-auto">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-colors"
              />
              <button 
                type="submit"
                className="bg-indigo-600 text-white rounded-xl p-3 hover:bg-indigo-700 transition-colors"
                disabled={newRequestLoading}
              >
                {newRequestLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                    <LuSendHorizonal className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModernAIChatMessaging;