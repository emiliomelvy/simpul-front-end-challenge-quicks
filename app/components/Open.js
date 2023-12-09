"use client";

import { useState } from "react";
import Image from "next/image";
import Messages from "./Messages";
import openSvg from "../../public/open.svg";
import taskSvg from "../../public/task.svg";
import inboxSvg from "../../public/inbox.svg";
import taskWhite from "../../public/task-white.svg";
import inboxWhite from "../../public/inbox-white.svg";

const Open = () => {
  // tools
  const [isImagesVisible, setImagesVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  // tools

  return (
    <>
      {/* tools */}
      <div
        className={`fixed bottom-5 right-4 flex justify-center items-center ${
          !selected ? "gap-4" : "gap-8"
        }`}
      >
        <div
          onClick={() => setSelected("task")}
          className={`bg-gray-6 rounded-full w-[60px] h-[60px] flex items-center justify-center cursor-pointer ${
            !isImagesVisible && "hidden"
          } ${selected === "task" && "hidden"}`}
        >
          <Image src={taskSvg} alt="task" />
        </div>
        <div
          onClick={() => setSelected("inbox")}
          className={`bg-gray-6 rounded-full w-[60px] h-[60px] flex items-center justify-center cursor-pointer ${
            !isImagesVisible && "hidden"
          } ${selected === "inbox" && "hidden"}`}
        >
          <Image src={inboxSvg} alt="inbox" />
        </div>
        <div
          className="cursor-pointer relative"
          onClick={() => setImagesVisible(!isImagesVisible)}
        >
          {selected && (
            <div className="w-[68px] h-[68px] bg-gray-2 absolute rounded-full right-4" />
          )}
          {!selected && (
            <Image src={openSvg} alt="open" className="z-10 relative" />
          )}
          {selected === "inbox" && (
            <div className="z-10 relative bg-[#8785FF] w-[68px] h-[68px] rounded-full flex justify-center items-center">
              <Image src={inboxWhite} alt="inbox-white" />
            </div>
          )}
          {selected === "task" && (
            <div className="z-10 relative bg-[#F8B76B] w-[68px] h-[68px] rounded-full flex justify-center items-center">
              <Image src={taskWhite} alt="task-white" />
            </div>
          )}
        </div>
      </div>
      {/* tools */}
      {selected === "inbox" && (
        <Messages
          selected={selected}
          setSelected={setSelected}
          setImagesVisible={setImagesVisible}
        />
      )}
    </>
  );
};

export default Open;
