"use client";

import { useState, useRef } from "react";

const date = new Date();

const hours = date.getHours();
const minutes = date.getMinutes();
const time = `${hours}:${String(minutes).padStart(2, "0")}`;

const Conversation = ({ conversation }) => {
  const [userMessage, setUserMessage] = useState([]);
  const userInput = useRef("");

  const handleInput = () => {
    const value = userInput.current.value;
    setUserMessage((prev) => [...prev, { message: value }]);

    userInput.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleInput();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        {conversation.map((item) => {
          return (
            <div key={item.id}>
              <div className="text-[#E5A443]">{item.name}</div>
              <div className="bg-[#FCEED3] rounded p-2.5 text-gray-2">
                {item.body}
                <br />
                {time}
              </div>
            </div>
          );
        })}
        {userMessage.length > 0 &&
          userMessage.map((message, index) => {
            return (
              <div className="max-w-[680px] place-self-end" key={index}>
                <div className="text-[#9B51E0] text-right">You</div>
                <div className="bg-[#EEDCFF] rounded p-2.5 right-0 text-gray-2 break-words">
                  {message.message}
                  <br />
                  {time}
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex gap-3 py-10">
        <input
          ref={userInput}
          type="text"
          placeholder="Type a new message"
          className="border rounded w-full py-1.5 px-2"
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-1 py-1.5 px-4 text-white rounded"
          onClick={handleInput}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Conversation;
