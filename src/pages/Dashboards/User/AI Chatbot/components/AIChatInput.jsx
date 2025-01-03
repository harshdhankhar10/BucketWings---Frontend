import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const AIChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-primary pr-12"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full  transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          <FaPaperPlane />
        </button>
      </div>
    </form>
  );
};

export default AIChatInput;