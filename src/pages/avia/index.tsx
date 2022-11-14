import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateInput from "../../components/DateInput";

import {
  selectData,
  setBackDate,
  setFromWhere,
  setThereDate,
  setToWhere,
  validateForm,
} from "../../store/flightStore";

const AviaPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { toWhere, fromWhere, isSubmittable, backDate, thereDate } =
    useSelector(selectData);

  const handleSumbit = (): void => {
    router.push("avia/info");
  };

  useEffect(() => {
    dispatch(validateForm());
  }, [backDate, thereDate, fromWhere, toWhere, dispatch]);

  return (
    <div className="mx-autow-[600px] md:w-[962px]">
      <div className="flex  flex-col justify-between gap-2 rounded-t-[15px] bg-[#5C87DB] p-[30px] pt-[17px] md:flex-row ">
        <div className="input_wrap ">
          <label className="text-[13px] text-white">Откуда</label>
          <input
            className="input"
            placeholder="Город вылета"
            value={fromWhere}
            onChange={(e) => dispatch(setFromWhere(e.target.value))}
          />
        </div>
        <div className="input_wrap ">
          <label className="text-[13px] text-white">Куда</label>
          <input
            className="input"
            placeholder="Город прилёта"
            value={toWhere}
            onChange={(e) => dispatch(setToWhere(e.target.value))}
          />
        </div>
        <DateInput
          title="Туда"
          date={thereDate}
          dispathType={setThereDate}
        ></DateInput>
        <DateInput
          title="Обратно"
          date={backDate}
          dispathType={setBackDate}
        ></DateInput>
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
