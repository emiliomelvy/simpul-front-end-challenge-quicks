import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrowLeft from "../../public/arrow-left.svg";
import closeSvg from "../../public/close.svg";

const Header = (props) => {
  const { setSelected, setImagesVisible, conversation, setConversation } =
    props;

  const handleClose = () => {
    setSelected(null);
    setImagesVisible(false);
  };

  return (
    <div>
      <div className="pb-5 flex items-center justify-between">
        <div className="flex gap-3">
          <Image
            src={arrowLeft}
            alt="back"
            className="cursor-pointer"
            onClick={() => setConversation(null)}
          />
          <div className="flex flex-col">
            <div className="flex text-blue-1 text-lg font-medium">
              {conversation.map((item, index) => {
                const words = `${item.name}`;
                const truncatedName =
                  words.length > 30 &&
                  conversation.length > 1 &&
                  item.name.length > 5 &&
                  index === conversation.length - 1
                    ? `${item.name.slice(0, 5)}...`
                    : item.name;

                return (
                  <React.Fragment key={item.id}>
                    {`${truncatedName}${
                      conversation.length > 1 &&
                      index !== conversation.length - 1
                        ? ", "
                        : ""
                    }`}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="text-sm">
              {conversation?.length > 1
                ? `${conversation?.length} participants`
                : "1 participant"}
            </div>
          </div>
        </div>
        <Image
          src={closeSvg}
          alt="close"
          className="mt-1 cursor-pointer"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default Header;
