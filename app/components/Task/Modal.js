"use client";

import { useState } from "react";

const Modal = ({ setShowModal, task, setTask }) => {
  const [tempTask, setTempTask] = useState({
    task: "",
    date: "",
    description: "",
  });

  const handleTask = () => {
    const newTask = {
      id: task.length + 1,
      task: tempTask.task,
      date: tempTask.date,
      description: tempTask.description,
      done: false,
    };

    const updatedTask = [...task, newTask];

    setTask(updatedTask);
    setShowModal(false);
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleTask();
  };

  return (
    <div className="fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
      <div className="w-full h-full bg-gray-500 opacity-40"></div>
      <div className="bg-white w-[550px] h-[320px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute rounded-xl py-6 px-28">
        <div className="flex flex-col">
          <label htmlFor="task">Task Title :</label>
          <input
            name="task"
            type="text"
            className="border rounded mt-2 mb-5"
            value={tempTask.task}
            onChange={(e) => setTempTask({ ...tempTask, task: e.target.value })}
          />
          <label htmlFor="date">Deadline :</label>
          <input
            name="date"
            type="date"
            className="border rounded mt-2 mb-5"
            value={tempTask.date}
            onChange={(e) => setTempTask({ ...tempTask, date: e.target.value })}
          />
          <label htmlFor="task">Description :</label>
          <input
            name="task"
            type="text"
            className="border rounded mt-2 mb-5"
            value={tempTask.description}
            onChange={(e) =>
              setTempTask({ ...tempTask, description: e.target.value })
            }
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <button
            onClick={() => setShowModal(false)}
            className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            className="bg-blue-1 hover:bg-[#478ced] text-white py-2 px-4 rounded"
            onClick={handleTask}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
