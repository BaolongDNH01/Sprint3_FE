import {ParkingLot} from '../../parking-lot-manage/entity/parking-lot';

export interface ParkingRe {
  idParking: number;
  dateStart: any;
  dateEnd: any;
  carType: string;
  status: boolean;
  customerName: string;
  customerEmail: string;
  license: string;
  ticketId: number;
  parkingLotDTO: ParkingLot;
}
