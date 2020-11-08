import {ParkingLot} from '../../parking-lot-manage/entity/parking-lot';

export interface ParkingRe {
  parkingId: number;
  dateStart: any;
  dateEnd: any;
  status: boolean;
  customerName: string;
  customerEmail: string;
  license: string;
  ticketId: number;
  parkingLotDTO: ParkingLot;
}
