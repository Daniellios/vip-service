import moment from "moment";

export const validateDate = (date: string) => {
  return moment(date).isValid();
};

export const formatDate = (date: string) => {
  if (date) {
    const resDate = moment(date).format("DD.MM.YYYY");
    if (resDate === "Invalid date") return "";
    return resDate;
  } else {
    return "";
  }
};
