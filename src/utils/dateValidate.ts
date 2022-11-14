import moment from "moment";

export const validateDate = (date: string) => {
  return moment(date).isValid();
};
