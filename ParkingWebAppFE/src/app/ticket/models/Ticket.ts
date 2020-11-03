export class Ticket {
  ticketId: number;
  startDate: string;
  endDate: string;
  ticketStatus: string;
  ticketTypeDetail: string;
  price: number;
  parkingLot: number;
  floorName: string;
  zoneName: string;
  carPlate: string;
  customerName: string;

  constructor(
    ticketId: number,
    startDate: string,
    endDate: string,
    ticketStatus: string,
    ticketTypeDetail: string,
    price: number,
    parkingLot: number,
    floorName: string,
    zoneName: string,
    carPlate: string,
    customerName: string) {
      this.ticketId = ticketId;
      this.customerName = customerName;
      this.startDate = startDate;
      this.endDate = endDate;
      this.ticketStatus = ticketStatus;
      this.ticketTypeDetail = ticketTypeDetail;
      this.price = price;
      this.parkingLot = parkingLot;
      this.carPlate = carPlate;
      this.floorName = floorName;
      this.zoneName = zoneName;
    }
}
