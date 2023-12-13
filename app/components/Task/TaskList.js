"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Modal from "./Modal";
import arrow from "../../../public/arrow.svg";
import option from "../../../public/option-black.svg";
import time from "../../../public/time.svg";
import pen from "../../../public/pen.svg";
import penBlack from "../../../public/pen-black.svg";

const TaskList = () => {
  const [task, setTask] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef({});

  const handleCheckbox = (id) => {
    setTask((prevTasks) => {
      const updatedTasks = prevTasks.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        }
        return item;
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleShow = (id) => {
    setTask((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return { ...item, show: !item.show };
        }
        return item;
      });

      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDateChange = (id, newDate) => {
    setTask((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return { ...item, date: newDate };
        }
        return item;
      });

      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  const handleEditDescription = (id, editedDescription) => {
    setTask((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return { ...item, description: editedDescription, Edited: false };
        }
        return item;
      });

      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  const getInput = (id) => {
    setTask((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return { ...item, Edited: true };
        }
        return item;
      });

      return updated;
    });
  };

  const calculateDaysLeft = (targetDate) => {
    const today = new Date();
    const deadline = new Date(targetDate);
    const timeDifference = deadline.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysLeft;
  };

  const showOption = (id) => {
    setTask((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, option: !task.option } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTask((prevTasks) => {
      const updatedTasks = prevTasks.filter((item) => item.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  useEffect(() => {
    const editedTask = task.find((item) => item.Edited);

    if (editedTask) {
      const input = inputRefs.current[editedTask.id];
      if (input) input.focus();
    }
  }, [task]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("tasks"));

    if (item) setTask(item);
  }, []);

  return (
    <>
      <div className="flex justify-between pb-5">
        <select className="ml-20 border border-black rounded p-2">
          <option value="mytask">My Task</option>
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-1 rounded py-2 px-4 text-white"
        >
          New Task
        </button>
      </div>
      {task.length === 0 ? (
        <div className="mt-[20%] text-center">You dont have any task ...</div>
      ) : (
        task.map((item) => {
          const daysLeft = calculateDaysLeft(item.date);
          return (
            <div className={`pt-5 border-b`} key={item.id}>
              <div className="flex justify-between pb-5">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    className="place-self-start mt-2"
                    checked={item.done}
                    onChange={() => {
                      handleCheckbox(item.id);
                    }}
                  />
                  <div className="text-gray-2 flex flex-col gap-4">
                    <div
                      className={`font-medium ${
                        item.done && "line-through text-gray-3"
                      }`}
                    >
                      {item.task}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-sm text-[#EB5757]">
                    {daysLeft === 0 && !item.done
                      ? "Deadline is Today"
                      : daysLeft > 0 && daysLeft <= 10 && !item.done
                      ? `${daysLeft} Days Left`
                      : ""}
                  </div>
                  <div>{item.date}</div>
                  <Image
                    src={arrow}
                    alt="expand"
                    className={`cursor-pointer ${
                      item.show ? "rotate-180" : ""
                    }`}
                    onClick={() => handleShow(item.id)}
                  />
                  <div className="relative">
                    <Image
                      src={option}
                      alt="option"
                      width={16}
                      className="cursor-pointer"
                      onClick={() => showOption(item.id)}
                    />
                    <div
                      className={`border border-black rounded-lg z-10 right-0 top-6 absolute bg-white hover:bg-slate-50 ${
                        item.option === false && "hidden"
                      }`}
                    >
                      <div
                        className="text-[#EB5757] pr-16 pl-3 py-2 cursor-pointer"
                        onClick={() => handleDeleteTask(item.id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`pl-7 pt-4 text-gray-2 pb-5 ${
                  item.show ? "hidden" : ""
                }`}
              >
                <div className="flex gap-2.5 pb-5">
                  <Image src={time} alt="time" width={20} />
                  <input
                    type="date"
                    className="border p-2 rounded"
                    value={item.date}
                    onChange={(e) => handleDateChange(item.id, e.target.value)}
                  />
                </div>
                <div className="flex gap-2.5">
                  <Image
                    src={item.description ? pen : penBlack}
                    alt="time"
                    width={20}
                    className="mb-auto cursor-pointer"
                    color="black"
                    onClick={() => getInput(item.id)}
                  />
                  {item.Edited ? (
                    <input
                      type="text"
                      className="border rounded"
                      defaultValue={item.description}
                      ref={(input) => (inputRefs.current[item.id] = input)}
                      onBlur={(e) =>
                        handleEditDescription(item.id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditDescription(item.id, e.target.value);
                        }
                      }}
                    />
                  ) : (
                    <div className="pr-12 break-words w-[620px]">
                      {item.description ? item.description : "No Description"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}

      {showModal && (
        <Modal setShowModal={setShowModal} task={task} setTask={setTask} />
      )}
    </>
  );
};

export default TaskList;
