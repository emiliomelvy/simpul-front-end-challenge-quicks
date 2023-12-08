"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import searchSvg from "../../public/search-black.svg";
import person from "../../public/person.svg";
import personInactive from "../../public/person-inactive.svg";

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
const formattedDate = `${month}, ${day}, ${year} ${hours}:${minutes}`;

const Messages = ({ selected }) => {
  const [messagesData, setMessagesData] = useState(null);

  useEffect(() => {
    console.log("secelted :", selected);
    if (selected === "inbox") {
      fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setMessagesData(json);
        });
    }
  }, [selected]);

  return (
    <div className="fixed border-2 rounded bottom-32 right-8 py-5 px-10 w-[734px] h-4/6 overflow-auto">
      <div className="relative w-full flex mb-7 border rounded">
        <input
          type="text"
          placeholder="Search"
          className="rounded w-full py-1"
        />
        <div className="flex items-center justify-center absolute right-2.5 top-1.5">
          <Image src={searchSvg} alt="search-message" width={12} height={12} />
        </div>
      </div>
      {messagesData &&
        messagesData.map((messages) => {
          return (
            <div
              className={`flex py-5 cursor-pointer ${
                messages.id !== messagesData.length && "border-b"
              }`}
              key={messages.id}
            >
              <div className="flex relative">
                <div className="bg-[#E0E0E0] w-[34px] h-[34px] flex justify-center items-center rounded-full">
                  <Image
                    src={personInactive}
                    alt="search-person-inactive"
                    width={18}
                    height={18}
                  />
                </div>
                <div className="z-10 absolute left-4 bg-blue-1 w-[34px] h-[34px] flex justify-center items-center rounded-full">
                  <Image
                    src={person}
                    alt="search-person-inactive"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
              <div className="pl-8">
                <div className="text-blue-1 font-medium">
                  {messages.email}{" "}
                  <span className="text-gray-2 font-normal text-sm pl-4">
                    {formattedDate}
                  </span>
                </div>
                <div className="text-gray-2 font-medium">{messages.name} :</div>
                <div>{messages.body}</div>
              </div>
            </div>
          );
        })}
      {!messagesData && (
        <div className="flex justify-center items-center mt-[30%]">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default Messages;
