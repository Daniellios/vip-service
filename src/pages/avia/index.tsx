import moment from "moment";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectData,
  setBackDate,
  setFromWhere,
  setThereDate,
  setToWhere,
  validateForm,
} from "../../store/flightStore";
import { validateDate } from "../../utils/dateValidate";

const AviaPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const backDateRef = useRef<HTMLInputElement>(null);
  const thereDateRef = useRef<HTMLInputElement>(null);

  const { toWhere, fromWhere, isSubmittable, backDate, thereDate } =
    useSelector(selectData);

  const handleSumbit = (): void => {
    router.push("avia/info");
  };

  useEffect(() => {
    dispatch(validateForm());
  }, [backDate, thereDate, fromWhere, toWhere, dispatch]);

  const handleBackDate = () => {
    const inputBackDateRef = backDateRef.current?.value;
    if (inputBackDateRef && inputBackDateRef !== null) {
      dispatch(setBackDate(inputBackDateRef));
      console.log(backDate);
    }
  };

  const handleTehereDate = () => {
    const inputThereDateRef = thereDateRef.current?.value;
    if (inputThereDateRef && inputThereDateRef !== null) {
      dispatch(setThereDate(inputThereDateRef));
      console.log(backDate);
    }
  };

  console.log(isSubmittable);

  return (
    <div className="mx-auto w-[962px] ">
      {/*FORM */}
      <div className="flex flex-row justify-between rounded-t-[15px] bg-[#5C87DB] p-[30px] pt-[17px]">
        <div className="flex flex-col gap-1 ">
          <label className="text-[13px] text-white">Откуда</label>
          <input
            className="input"
            placeholder="Город вылета"
            value={fromWhere}
            onChange={(e) => dispatch(setFromWhere(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-[13px] text-white">Куда</label>
          <input
            className="input"
            placeholder="Город прилёта"
            value={toWhere}
            onChange={(e) => dispatch(setToWhere(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-[13px] text-white">Туда</label>
          <div className="relative flex flex-row items-center">
            <span className="pointer-events-none absolute top-[14px] left-[12px] flex items-center justify-center bg-white">
              <input
                ref={thereDateRef}
                onChange={handleTehereDate}
                type="date"
                className={`pointer-events-auto absolute left-[-2.3rem]  h-14 w-14 cursor-pointer bg-transparent opacity-0 focus:outline-none`}
              />
              {validateDate(thereDate) ? (
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
              value={thereDate && moment(thereDate).format("DD.MM.YYYY")}
              onChange={handleTehereDate}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-[13px] text-white">Обратно</label>
          <div className="relative flex flex-row items-center">
            <span className="pointer-events-none absolute top-[14px] left-[12px] flex items-center justify-center bg-white">
              <input
                ref={backDateRef}
                onChange={handleBackDate}
                type="date"
                className={`pointer-events-auto absolute left-[-2.3rem]  h-14 w-14 cursor-pointer bg-transparent opacity-0 focus:outline-none`}
              />
              {validateDate(backDate) ? (
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
              value={backDate && moment(backDate).format("DD.MM.YYYY")}
              onChange={handleBackDate}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-end rounded-b-xl rounded-br-xl bg-white  px-[29px] py-[23px] text-white drop-shadow-md">
        <button
          disabled={!isSubmittable}
          onClick={handleSumbit}
          className="focus::bg-[#3E67B7] flex cursor-pointer items-center justify-center rounded-md  bg-[#5C87DB] px-4 py-2 text-white active:bg-[#3E67B7] active:text-white/50 disabled:bg-[#B7BAC1]"
        >
          Найти билеты
        </button>
      </div>
    </div>
  );
};

export default AviaPage;
