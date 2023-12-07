"use client";

import { useState } from "react";
import Image from "next/image";
import openSvg from "../../public/open.svg";
import taskSvg from "../../public/task.svg";
import inboxSvg from "../../public/inbox.svg";

const Open = () => {
  const [isImagesVisible, setImagesVisible] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 flex gap-4">
      <div
        className={`bg-gray-6 rounded-full w-[60px] h-[60px] flex items-center justify-center cursor-pointer ${
          isImagesVisible ? "" : "hidden"
        }`}
      >
        <Image src={taskSvg} alt="task" />
      </div>
      <div
        className={`bg-gray-6 rounded-full w-[60px] h-[60px] flex items-center justify-center cursor-pointer ${
          isImagesVisible ? "" : "hidden"
        }`}
      >
        <Image src={inboxSvg} alt="inbox" />
      </div>
      <div
        className="cursor-pointer"
        onClick={() => setImagesVisible(!isImagesVisible)}
      >
        <Image src={openSvg} alt="open" />
      </div>
    </div>
  );
};

export default Open;
