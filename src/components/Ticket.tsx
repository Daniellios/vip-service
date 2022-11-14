import Image from "next/image";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bagage from "./SVGs/bagage";
import { changeTicketTime, selectData } from "../store/flightStore";
import { formatDate, validateDate } from "../utils/dateValidate";
import { Line, FlipLine } from "./SVGs/Line";
import type { IFlightOption } from "../interfaces/interfaces";

interface ITicketProps {
  flightRoute: string;
}

export const Ticket: FC<ITicketProps> = ({ flightRoute }) => {
  const { fromWhere, toWhere, backDate, thereDate, fligthOptions } =
    useSelector(selectData);
  const activeTime = fligthOptions.find((el) => el.isSelected);

  console.log(flightRoute);

  const dispatch = useDispatch();

  console.log(activeTime);

  return (
    <div
      className={`flex flex-row items-center justify-between ${
        validateDate(backDate) ? "pb-[40px]" : ""
      }`}
    >
      <div>
        <div className="rounded-tl-[15px] rounded-br-[15px] bg-[#8BA5D8] py-[4px] text-center text-[12px] text-white">
          Невозвратный
        </div>
        <Image
          src={"/logo.png"}
          width={39}
          height={39}
          alt="S7"
          className="mx-auto mt-[28px]"
        />
        <p className="mx-[23px] mt-[8px] text-[21px] text-[#5C5C5C]">
          S7 Airlines
        </p>
      </div>

      <div
        className={`flex flex-col pr-[20px] pl-[25px] ${
          flightRoute === "back" ? "border-t border-dashed border-[#5C87DB]" : 0
        }`}
      >
        <div className="flex h-full flex-row justify-between">
          <div className="mt-[41px] mr-[10px] w-[100px] whitespace-nowrap">
            <p className="mb-2 text-[24px] font-bold leading-[24px] text-[#232323]">
              {activeTime?.start}
            </p>
            <p className="city">
              {flightRoute === "from" ? fromWhere : toWhere}
            </p>
            <p className="text-[14px] leading-[14px] text-[#5C5C5C]">
              {flightRoute === "from"
                ? formatDate(thereDate)
                : formatDate(backDate)}
            </p>
          </div>

          {flightRoute === "from" ? (
            <div className="mt-8 self-center">
              <Line />
            </div>
          ) : (
            <div className="mt-8 self-center">
              <FlipLine />
            </div>
          )}

          <div className="mt-[41px] ml-10 mr-[33px] w-[100px] whitespace-nowrap">
            <p className="mb-2 text-[24px] font-bold leading-[24px] text-[#232323]">
              {activeTime?.end}
            </p>
            <p className="city">
              {flightRoute === "back" ? fromWhere : toWhere}
            </p>
            <p className="text-[14px] leading-[14px] text-[#5C5C5C]">
              {flightRoute === "back"
                ? formatDate(backDate)
                : formatDate(thereDate)}
            </p>
          </div>
          <Bagage />
        </div>
        {!validateDate(backDate) && (
          <div className="mb-[27px] mt-[24px] flex flex-row">
            {fligthOptions.map((item: IFlightOption) => {
              return (
                <div
                  className={`mr-[20px] mt-auto h-min cursor-pointer rounded-[10px] font-medium transition-all
                    ${
                      item.isSelected
                        ? "border bg-[#DDE3EE] py-[9px] pl-[15px] pr-[18px] text-black"
                        : "border border-[#B7BAC1] py-[9px] pl-[15px] pr-[18px] text-[#5C5C5C]"
                    }`}
                  onClick={() => dispatch(changeTicketTime(item.id))}
                  key={item.id}
                >
                  <span className="text-[18px]">{item.start}</span>
                  <span className="mx-[3px]">-</span>
                  <span className="text-[14px]">{item.end}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
