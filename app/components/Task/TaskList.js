"use client";

import Image from "next/image";
import arrow from "../../../public/arrow.svg";
import option from "../../../public/option-black.svg";
import time from "../../../public/time.svg";
import pen from "../../../public/pen.svg";

const TaskList = () => {
  return (
    <section className="py-10">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <input type="checkbox" className="place-self-start mt-2" />
          <div className="text-gray-2 flex flex-col gap-4">
            <div className="font-medium">Set up appointment with Dr Blake</div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-sm text-[#EB5757]">10 Days Left</div>
          <div>22/06/2021</div>
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
          <input type="date" className="border p-2 rounded" />
        </div>
        <div className="flex gap-2.5">
          <Image
            src={pen}
            alt="time"
            width={20}
            className="mb-auto cursor-pointer"
          />
          <div className="pr-12">
            All Cases must include all payment transactions, all documents and
            forms filled. All conversations in comments and messages in channels
            and emails should be provided as well in.
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskList;
