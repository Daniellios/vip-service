import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bagage from "./SVGs/bagage";
import Scheme from "./SVGs/Line";
import { changeTicketTime, selectData } from "../store/flightStore";
import { validateDate } from "../utils/dateValidate";
import Line from "./SVGs/Line";

interface ITicketProps {
  direction: string;
}

export const Ticket: FC<ITicketProps> = ({ direction }) => {
  const router = useRouter();
  const {
    fromWhere,
    toWhere,
    backDate,
    thereDate,
    isSubmittable,
    fligthOptions,
  } = useSelector(selectData);
  const activeTime = fligthOptions.find((el) => el.isSelected);

  console.log(direction);

  const dispatch = useDispatch();

  console.log(activeTime);

  return (
    <div
      className={`flex flex-row justify-between ${
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
          direction === "back" ? "border-t border-dashed border-[#5C87DB]" : 0
        }`}
      >
        <div className="flex h-full flex-row justify-between">
          <div className="mt-[41px] mr-[10px] w-[100px] whitespace-nowrap">
            <p className="mb-[8px] text-[24px] font-bold leading-[24px] text-[#232323]">
              {activeTime?.start}
            </p>
            <p className="text-[14px] font-medium leading-[14px] text-[#5C5C5C]">
              {direction === "from" ? fromWhere : toWhere}
            </p>
            <p className="text-[14px] leading-[14px] text-[#5C5C5C]">
              {direction === "from"
                ? moment(thereDate).format("DD.MM.YYYY")
                : moment(backDate).format("DD.MM.YYYY")}
            </p>
          </div>

          <div className="mt-[32px]">
            <Line />
          </div>

          <div className="mt-[41px] ml-[40px] mr-[33px] w-[100px] whitespace-nowrap">
            <p className="mb-[8px] text-[24px] font-bold leading-[24px] text-[#232323]">
              {activeTime?.end}
            </p>
            <p className="text-[14px] font-medium leading-[14px] text-[#5C5C5C]">
              {direction === "back" ? fromWhere : toWhere}
            </p>
            <p className="text-[14px] leading-[14px] text-[#5C5C5C]">
              {direction === "back"
                ? moment(backDate).format("DD.MM.YYYY")
                : moment(thereDate).format("DD.MM.YYYY")}
            </p>
          </div>

          <div>
            <Bagage />
          </div>
        </div>
        {!validateDate(backDate) && (
          <div className="mb-[27px] mt-[24px] flex flex-row">
            {fligthOptions.map((item) => {
              return (
                <div
                  className={`mr-[20px] mt-auto h-min cursor-pointer rounded-[10px] font-medium 
                    ${
                      item.isSelected
                        ? "bg-[#DDE3EE] py-[9px] pl-[15px] pr-[18px] text-black"
                        : "border border-[#B7BAC1] py-[3px] pr-[7px] pl-[3px] text-[#5C5C5C]"
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
