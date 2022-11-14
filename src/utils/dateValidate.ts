import moment from "moment";

export const validateDate = (date: string) => {
  return moment(date).isValid();
};

export const formatDate = (date: string) => {
  return moment(date).format("DD.MM.YYYY");
};
