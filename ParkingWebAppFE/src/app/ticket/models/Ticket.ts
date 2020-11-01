export class Ticket {

  ticketId: number;

  startDate: string;

  endDate: string;

  ticketStatus: string;

  tickTypeDetail: string;

  price: number;

  parkingLots: number[];

  carPlates: string[];

  constructor(
    ticketId: number,
    startDate: string,
    endDate: string,
    ticketTypeDetail: string,
    price: number,
    parkingLots: number[],
    carPlates: string[]) {
      this.ticketId = ticketId;
      this.startDate = startDate;
      this.endDate = endDate;
      this.tickTypeDetail = ticketTypeDetail;
      this.price = price;
      this.parkingLots = parkingLots;
      this.carPlates = carPlates;
    }
}
