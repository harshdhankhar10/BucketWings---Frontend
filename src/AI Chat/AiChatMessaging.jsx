import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./AIChatSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useChat } from "../context/AIChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    chats,
  } = useChat();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-scree">
      <div className="flex flex-1 flex-col">
        <div className="flex-1 p-6 mb-20 md:mb-0">
          <div
            className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar"
            ref={messagecontainerRef}
          >
            {messages && messages.length > 0 ? (
              messages.map((e, i) => (
                <div key={i}>
                  <div className="mb-4 p-4 rounded bg-blue-700 text-white flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                      <CgProfile />
                    </div>
                    {e.question}
                  </div>

                  <div className="mb-4 p-4 rounded bg-gray-700 text-white flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                      <FaRobot />
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: e.answer }}></p>
                  </div>
                </div>
              ))
            ) : (
              <p>No chat yet</p>
            )}

            {newRequestLoading && <LoadingSmall />}
          </div>
        </div>
      </div>

      {chats && chats.length === 0 ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%]">
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center"
          >
            <input
              className="flex-grow p-4 bg-gray-700 rounded-l text-white outline-none"
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <button className="p-4 bg-gray-700 rounded-r text-2xl text-white">
              <IoMdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
