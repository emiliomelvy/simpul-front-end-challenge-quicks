"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import searchSvg from "../../public/search-black.svg";
import person from "../../public/person.svg";
import personInactive from "../../public/person-inactive.svg";

const Messages = () => {
  const [messagesData, setMessagesData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setMessagesData(json);
      });
  }, []);

  return (
    <div className="fixed border-2 rounded bottom-32 right-8 p-5">
      <div className="relative w-fit ml-auto flex mb-7 border rounded">
        <input type="text" placeholder="Search" className="rounded" />
        <div className="flex items-center justify-center absolute right-2.5 top-1.5">
          <Image src={searchSvg} alt="search-message" width={12} height={12} />
        </div>
      </div>
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
    </div>
  );
};

export default Messages;
