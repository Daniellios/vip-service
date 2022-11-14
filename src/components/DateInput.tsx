import Image from "next/image";
import React, { useRef } from "react";
import type { FC } from "react";
import { useDispatch } from "react-redux";
import { formatDate, validateDate } from "../utils/dateValidate";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface IDateInputProps {
  title: string;
  date: string;
  dispathType:
    | ActionCreatorWithPayload<string, "flight/setThereDate">
    | ActionCreatorWithPayload<string, "flight/setBackDate">;
}

const DateInput: FC<IDateInputProps> = ({ title, date, dispathType }) => {
  // ДЛФ ПОЛУЧЕНИя ДАТЫ С ИНПУТА
  const dateRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const handleDateInput = (): void => {
    const inputDateRefValue = dateRef.current?.value;
    if (inputDateRefValue && inputDateRefValue !== null) {
      dispatch(dispathType(inputDateRefValue));
    }
  };

  return (
    <div className="input_wrap">
      <label className="text-[13px] text-white">{title}</label>
      <div className="relative flex flex-row items-center">
        <span className="pointer-events-none absolute top-[14px] left-3 flex items-center justify-center bg-white">
          <input
            ref={dateRef}
            onChange={handleDateInput}
            type="date"
            className={`pointer-events-auto absolute left-[-2.3rem] h-14 w-14 cursor-pointer bg-transparent opacity-0 focus:outline-none`}
          />
          {validateDate(date) ? (
            <Image
              className="pointer-events:none cursor-pointer"
              src={"/calendar-blue.png"}
              width={16}
              height={16}
              alt="calendar-icon"
            ></Image>
          ) : (
            <Image
              className="pointer-events:none cursor-pointer"
              src={"/calendar-black.png"}
              width={16}
              height={16}
              alt="calendar-icon"
            ></Image>
          )}
        </span>
        <input
          className="input_date"
          placeholder="дд.мм.гг"
          value={date && formatDate(date)}
          onChange={(e) => dispatch(dispathType(e.currentTarget.value))}
        />
      </div>
    </div>
  );
};

export default DateInput;
