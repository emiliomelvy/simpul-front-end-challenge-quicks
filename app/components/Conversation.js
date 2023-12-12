"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import DividerNew from "./DividerNew";
import optionSvg from "../../public/option-black.svg";

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
    JSON.parse(localStorage.getItem(conversation?.[0]?.email)) || [];

  const savedIndex = storedMessages.length;
  const [userMessage, setUserMessage] = useState(
    storedMessages.map((msg, index) => ({
      ...msg,
      id: index,
    }))
  );
  const userInput = useRef("");
  const [newMessage, setNewMessage] = useState(false);
  const [editMessage, setEditMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);

  const handleInput = () => {
    const value = userInput.current.value;
    setUserMessage((prev) => [
      ...prev,
      { id: prev.length, message: value, user: true, option: false },
    ]);

    localStorage.setItem(conversation?.[0]?.email, JSON.stringify(userMessage));

    userInput.current.value = "";
    setNewMessage(true);
    setTimeout(() => {
      setNewMessage(false);
    }, 60000);
    setUserMessage((prev) => [
      ...prev,
      {
        id: prev.length,
        message: conversation[0].body,
        name: conversation[0].name,
        user: false,
        option: false,
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleInput();
  };

  const handleEditOption = (id) => {
    const selectedIndex = userMessage.findIndex((msg) => msg.id === id);
    const selectedMessage = userMessage[selectedIndex];

    const editConfirmed = window.confirm(
      `Do you want to edit this message?\n\nMessage: ${selectedMessage.message}`
    );

    const editedMessage = prompt("Edit the message:", selectedMessage.message);
    if (editedMessage !== null) {
      setUserMessage((prev) => [
        ...prev.slice(0, selectedIndex),
        { ...selectedMessage, message: editedMessage },
        ...prev.slice(selectedIndex + 1),
      ]);
    }

    localStorage.setItem(conversation?.[0]?.email, JSON.stringify(userMessage));
    showOption(id);
  };

  const handleDeleteOption = (id) => {
    const selectedIndex = userMessage.findIndex((msg) => msg.id === id);
    const selectedMessage = userMessage[selectedIndex];

    const deleteConfirmed = window.confirm(
      `Do you want to delete this message?\n\nMessage: ${selectedMessage.message}`
    );

    if (deleteConfirmed) {
      // Delete
      setUserMessage((prev) => [
        ...prev.slice(0, selectedIndex),
        ...prev.slice(selectedIndex + 1),
      ]);
    }

    localStorage.setItem(conversation?.[0]?.email, JSON.stringify(userMessage));

    showOption(id);
  };

  const showOption = (id) =>
    setUserMessage((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, option: !msg.option } : msg))
    );

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
      <div>
        <div style={{ color: colorVariables[0].text }}>New User</div>
        <div
          className="rounded p-2.5 text-gray-2"
          style={{
            background: colorVariables[0].background,
          }}
        >
          Initial Message
          <br />
          {time}
        </div>
      </div>

      {userMessage.length > 0 &&
        userMessage.map((message) => {
          const colorIndex = message.id % colorVariables.length;
          return (
            <React.Fragment key={message.id}>
              {newMessage && message.id >= savedIndex && !message.user && (
                <DividerNew />
              )}
              <div className="flex flex-col">
                {message.user ? (
                  <div className="max-w-[680px] place-self-end">
                    <div className="text-[#9B51E0] text-right">You</div>
                    <div className="flex">
                      <div className="relative">
                        <Image
                          src={optionSvg}
                          alt="option"
                          width={16}
                          height={16}
                          className="mr-3 cursor-pointer"
                          onClick={() => showOption(message.id)}
                        />
                        <div
                          className={`border rounded-lg z-10 absolute bg-white ${
                            message.option === false && "hidden"
                          }`}
                        >
                          <div
                            className="text-blue-1 border-b pr-16 pl-3 py-2 cursor-pointer"
                            onClick={() => handleEditOption(message.id)}
                          >
                            Edit
                          </div>
                          <div
                            className="text-[#EB5757] pr-16 pl-3 py-2 cursor-pointer"
                            onClick={() => handleDeleteOption(message.id)}
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#EEDCFF] rounded p-2.5 right-0 text-gray-2 break-words">
                        {message.message}
                        <br />
                        {time}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[680px]">
                    <div style={{ color: colorVariables[colorIndex].text }}>
                      {message.name}
                    </div>
                    <div className="grid grid-cols-12 group">
                      <div
                        className="col-span-10 rounded p-2.5 right-0 text-gray-2 break-words"
                        style={{
                          background: colorVariables[colorIndex].background,
                        }}
                      >
                        {message.message}
                        <br />
                        {time}
                      </div>
                      <div className="col-span-1 group-hover:flex relative hidden">
                        <Image
                          src={optionSvg}
                          alt="option"
                          width={16}
                          height={16}
                          className="mb-auto ml-3 cursor-pointer"
                          onClick={() => showOption(message.id)}
                        />
                        <div
                          className={`border top-5 left-3 rounded-lg z-10 absolute bg-white ${
                            message.option === false && "hidden"
                          }`}
                        >
                          <div
                            className="text-blue-1 border-b pr-16 pl-3 py-2 cursor-pointer"
                            onClick={() => handleEditOption(message.id)}
                          >
                            Edit
                          </div>
                          <div
                            className="text-[#EB5757] pr-16 pl-3 py-2 cursor-pointer"
                            onClick={() => handleDeleteOption(message.id)}
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
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
