import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ChatContext = createContext();

const server = import.meta.env.VITE_REACT_APP_API;
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createLod, setCreateLod] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const fetchResponse = async () => {
    if (!prompt) {
      return toast.error("Please enter a prompt");
    }
    
    setNewRequestLoading(true);
    const originalPrompt = prompt;
    setPrompt("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: originalPrompt }] }],
        }
      );

      const message = {
        question: originalPrompt,
        answer: response.data.candidates[0]?.content?.parts[0]?.text || "No answer received",
      };

      setMessages(prev => [...prev, message]);

      await axios.post(
        `${server}/api/v1/aiChat/${selected}`,
        {
          question: originalPrompt,
          answer: message.answer,
        },
        { headers: { Authorization: token } }
      );

    } catch (error) {
      console.error("Error fetching response:", error);
      toast.error("Something went wrong");
    } finally {
      setNewRequestLoading(false);
    }
  };

  const fetchChats = async () => {
    if (!token) {
      console.error("No token found, cannot fetch chats.");
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/v1/aiChat/all`, {
        headers: { Authorization: token },
      });

      setChats(data);
      if (data.length > 0) {
        setSelected(data[0]._id); // Select the first chat if available
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const createChat = async () => {
    setCreateLod(true);
    try {
      await axios.post(
        `${server}/api/v1/aiChat/new`,
        {},
        { headers: { Authorization: token } }
      );

      toast.success("Chat created successfully!");
      await fetchChats();
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Something went wrong");
    } finally {
      setCreateLod(false);
    }
  };

  const fetchMessages = async () => {
    if (!selected) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/aiChat/${selected}`, {
        headers: { Authorization: token },
      });
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/v1/aiChat/${id}`, {
        headers: { Authorization: token },
      });
      toast.success(data.message);
      await fetchChats();
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
