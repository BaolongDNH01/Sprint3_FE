import {Car} from '../car/car';

export interface Parking {
  idParking: number;
  dateIn: any;
  dateOut: any;
  status: boolean;
  car: Car;
}
