const currentDate = new Date();

const options = {
  month: "long",
  day: "2-digit",
  year: "numeric",
};

const formattedDate = currentDate.toLocaleDateString("en-US", options);

const Divider = () => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="border-t w-1/3 my-auto border-black"></div>
      <div className="font-medium">Today {formattedDate}</div>
      <div className="border-t w-1/3 my-auto border-black"></div>
    </div>
  );
};

export default Divider;
