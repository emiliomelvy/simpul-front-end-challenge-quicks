"use client";

import React, { useState, useRef, useEffect } from "react";
import DividerNew from "./DividerNew";

const date = new Date();

const hours = date.getHours();
const minutes = date.getMinutes();
const time = `${hours}:${String(minutes).padStart(2, "0")}`;

const colorVariables = [
  { background: "#dcffde", text: "#51e058" },
  { background: "#FCEED3", text: "#E5A443" },
  { background: "#ffdce7", text: "#e05172" },
  { background: "#dcf9ff", text: "#51a2e0" },
];

const Conversation = ({ conversation }) => {
  const storedMessages =
    JSON.parse(localStorage.getItem(conversation[0].email)) || [];
  const savedIndex = storedMessages.length;
  const [userMessage, setUserMessage] = useState(storedMessages);
  const userInput = useRef("");
  const [newMessage, setNewMessage] = useState(false);

  const handleInput = () => {
    const value = userInput.current.value;
    setUserMessage((prev) => [...prev, { message: value }]);

    localStorage.setItem(conversation[0].email, JSON.stringify(userMessage));

    userInput.current.value = "";
    setNewMessage(true);
    setTimeout(() => {
      setNewMessage(false);
    }, 60000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleInput();
  };

  const scrollToBottom = () =>
    userInput.current.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem(conversation[0].email, JSON.stringify(userMessage));
  }, [userMessage]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(conversation[0].email));

    if (items) {
      setUserMessage(items);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        {conversation.map((item, index) => {
          const colorIndex = index % colorVariables.length;
          return (
            <div key={item.id}>
              <div style={{ color: colorVariables[colorIndex].text }}>
                {item.name}
              </div>
              <div
                className={`rounded p-2.5 text-gray-2`}
                style={{ background: colorVariables[colorIndex].background }}
              >
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
              <React.Fragment key={index}>
                {newMessage && index >= savedIndex && <DividerNew />}
                <div className="max-w-[680px] place-self-end">
                  <div className="text-[#9B51E0] text-right">You</div>
                  <div className="bg-[#EEDCFF] rounded p-2.5 right-0 text-gray-2 break-words">
                    {message.message}
                    <br />
                    {time}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
      <div className="flex gap-3 pt-10 pb-5">
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
