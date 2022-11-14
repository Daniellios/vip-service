export interface ITicket {
  isSubmittable: boolean;
  fromWhere: string;
  toWhere: string;
  thereDate: string;
  backDate: string;
  fligthOptions: IFlightOption[];
}

export interface IFlightOption {
  id: number;
  start: string;
  end: string;
  isSelected: boolean;
}
