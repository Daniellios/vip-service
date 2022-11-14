import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { validateDate } from "../../utils/dateValidate";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../store/flightStore";
import { Ticket } from "../../components/Ticket";

const InfoPage: NextPage = () => {
  const router = useRouter();
  const { backDate, isSubmittable, thereDate } = useSelector(selectData);

  useEffect(() => {
    if (!isSubmittable) router.push("/avia");
  }, []);

  return (
    <>
      {isSubmittable && (
        <div className="mx-auto flex w-[962px] flex-row justify-between rounded-[15px] shadow-xl">
          <div className="border-r border-r-[#DDE3EE]">
            <Ticket direction="from" />
            {validateDate(backDate) && <Ticket direction="back" />}
          </div>

          <div className="mx-auto my-auto text-[32px] font-bold text-[#232323]">
            {!validateDate(backDate) ? "4 150 ₽" : "9 300 ₽"}
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPage;
