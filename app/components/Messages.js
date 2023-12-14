"use client";

import React, { useEffect, useState } from "react";
import MessageList from "./MessageLists";
import Conversation from "./Conversation";
import Header from "./ConversationHeader";
import Divider from "./Divider";

// Create a new Date object
const currentDate = new Date();

// Define arrays for month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get individual components
const month = monthNames[currentDate.getMonth()];
const day = currentDate.getDate();
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

// Format the date string
const formattedDate = `${month}, ${day}, ${year} ${hours}:${String(
  minutes
).padStart(2, "0")}`;

const Messages = (props) => {
  const { selected, setSelected, setImagesVisible } = props;
  const [messagesData, setMessagesData] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMessage = (id) => {
    fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}&_start=${
        id > 4 ? 1 : id
      }&_limit=${id}`
    )
      .then((response) => response.json())
      .then((json) => {
        setConversation(json);
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (selected === "inbox") {
      let url = "https://jsonplaceholder.typicode.com/comments?postId=1";

      if (searchQuery) {
        url += `&q=${searchQuery}`;
      }

      fetch(url)
        .then((response) => response.json())
        .then((json) => setMessagesData(json));
    }
  }, [selected, searchQuery]);

  return (
    <div className="fixed border-2 rounded bottom-32 right-8 py-5 px-6 w-[734px] h-4/6 overflow-auto">
      {conversation ? (
        <>
          <Header
            setSelected={setSelected}
            setImagesVisible={setImagesVisible}
            conversation={conversation}
            setConversation={setConversation}
          />
          <Divider />
          <Conversation conversation={conversation} />
        </>
      ) : (
        <MessageList
          messagesData={messagesData}
          formattedDate={formattedDate}
          handleMessage={handleMessage}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default Messages;
