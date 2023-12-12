"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import arrow from "../../../public/arrow.svg";
import option from "../../../public/option-black.svg";
import time from "../../../public/time.svg";
import pen from "../../../public/pen.svg";

const TaskList = () => {
  const [task, setTask] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      {task.map((item) => {
        return (
          <div className={`pt-5 border-b`} key={item.id}>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <input type="checkbox" className="place-self-start mt-2" />
                <div className="text-gray-2 flex flex-col gap-4">
                  <div className="font-medium">{item.task}</div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="text-sm text-[#EB5757]">10 Days Left</div>
                <div>{item.date}</div>
                <Image src={arrow} alt="expand" className="cursor-pointer" />
                <Image
                  src={option}
                  alt="option"
                  width={16}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="pl-7 pt-4 text-gray-2 pb-10">
              <div className="flex gap-2.5 pb-5">
                <Image src={time} alt="time" width={20} />
                <input
                  type="date"
                  className="border p-2 rounded"
                  value={item.date}
                />
              </div>
              <div className="flex gap-2.5">
                <Image
                  src={pen}
                  alt="time"
                  width={20}
                  className="mb-auto cursor-pointer"
                />
                <div className="pr-12 break-words w-[620px]">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          task={task}
          setTask={setTask}
        />
      )}
    </>
  );
};

export default TaskList;
