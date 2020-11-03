import {Rank} from './Rank';

export class User {
  userId: number;
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  birthday: string;
  address: string;
  gender: string;
  rank: Rank;

  constructor() {
  }
}
