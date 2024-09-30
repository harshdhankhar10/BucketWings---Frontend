import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/quotes');
        const data = response.data.quotes;
        const random = Math.floor(Math.random() * data.length);
        setQuote(data[random].quote);
        setAuthor(data[random].author);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchQuote();
  }, []); 

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold">Motivational Quote</h2>
      <p className="mt-2 italic">{quote}</p>
      <p className="mt-2 font-semibold">- {author}</p>
    </div>
  );
};

export default MotivationalQuote;
