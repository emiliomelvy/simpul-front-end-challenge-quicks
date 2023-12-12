const Header = () => {
  return (
    <div className="flex justify-between">
      <select className="ml-20 border border-black rounded p-2">
        <option value="mytask">My Task</option>
      </select>
      <button className="bg-blue-1 rounded py-2 px-4 text-white">
        New Task
      </button>
    </div>
  );
};

export default Header;
