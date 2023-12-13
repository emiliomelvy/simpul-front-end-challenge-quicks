"use client";

import { useEffect, useState } from "react";
import TaskList from "./TaskList";

const TaskContainer = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  }, []);

  return (
    <div className="fixed border-2 rounded bottom-32 right-8 py-5 px-6 w-[734px] h-4/6 overflow-auto">
      {showLoader ? (
        <div className="flex flex-col justify-center items-center mt-[20%] font-medium">
          <span className="loader mb-5"></span>
          Loading Task List ...
        </div>
      ) : (
        <TaskList />
      )}
    </div>
  );
};

export default TaskContainer;
