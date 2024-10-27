import axios from "axios";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { toast } from 'react-toastify';

const ChatContext = createContext();

const server = import.meta.env.VITE_REACT_APP_API;
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const fetchResponse = async () => {
    if (!prompt.trim()) {
      return toast.error("Please enter a valid prompt.");
    }

    setIsRequestLoading(true);
    const userPrompt = prompt;
    setPrompt("");

    try {
      const { data } = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: userPrompt }] }] }
      );

      const answer = data?.candidates[0]?.content?.parts[0]?.text || "No answer received";
      const newMessage = { question: userPrompt, answer };

      setMessages((prev) => [...prev, newMessage]);

      await axios.post(
        `${server}/api/v1/aiChat/${selectedChat}`,
        newMessage,
        { headers: { Authorization: token } }
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      toast.error("Something went wrong while fetching the response.");
    } finally {
      setIsRequestLoading(false);
    }
  };

  const fetchChats = async () => {
    if (!token) return console.error("No token found, cannot fetch chats.");

    try {
      const { data } = await axios.get(`${server}/api/v1/aiChat/all`, {
        headers: { Authorization: token },
      });

      setChats(data);
      if (data.length) {
        setSelectedChat(data[0]._id); // Select the first chat if available
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Failed to load chats.");
    }
  };

  const createChat = async () => {
    setIsCreatingChat(true);
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
      toast.error("Failed to create a new chat.");
    } finally {
      setIsCreatingChat(false);
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    setIsLoadingMessages(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/aiChat/${selectedChat}`, {
        headers: { Authorization: token },
      });
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages.");
    } finally {
      setIsLoadingMessages(false);
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
      toast.error("Failed to delete the chat.");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const contextValue = useMemo(() => ({
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    isRequestLoading,
    chats,
    createChat,
    isCreatingChat,
    selectedChat,
    setSelectedChat,
    isLoadingMessages,
    deleteChat,
  }), [
    fetchResponse, messages, prompt, isRequestLoading, chats, createChat,
    isCreatingChat, selectedChat, isLoadingMessages, deleteChat,
  ]);

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
