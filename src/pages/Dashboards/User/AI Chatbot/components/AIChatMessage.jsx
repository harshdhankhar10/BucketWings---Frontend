import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const AIChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} mb-4`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? '' : ''
      }`}>
        {isUser ? <FaUser className="" /> : <FaRobot className="" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isUser ? '' : ''
      }`}>
        <ReactMarkdown className="prose">
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AIChatMessage;