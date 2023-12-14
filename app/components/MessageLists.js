import Image from "next/image";
import searchSvg from "../../public/search-black.svg";
import person from "../../public/person.svg";
import personInactive from "../../public/person-inactive.svg";

const List = ({
  messagesData,
  formattedDate,
  handleMessage,
  searchQuery,
  handleSearch,
}) => {
  const filteredMessages =
    messagesData &&
    messagesData.filter(
      (message) =>
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <div className="relative w-full flex mb-7 px-14 border rounded">
        <input
          type="text"
          placeholder="Search"
          className="rounded w-full py-1 outline-none"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="flex items-center justify-center absolute right-10 top-3">
          <Image src={searchSvg} alt="search-message" width={12} height={12} />
        </div>
      </div>
      {filteredMessages &&
        filteredMessages.map((messages) => {
          return (
            <div
              className={`flex py-5 cursor-pointer ${
                messages.id !== filteredMessages.length && "border-b"
              }`}
              key={messages.id}
              onClick={() => handleMessage(messages.id)}
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
      {!filteredMessages && (
        <div className="flex flex-col justify-center items-center mt-[30%]">
          <span className="loader"></span>
          <div className="text-gray-2 pt-4">Loading Chats ...</div>
        </div>
      )}
    </>
  );
};

export default List;
