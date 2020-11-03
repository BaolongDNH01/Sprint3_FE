export class SocialSignUpInfo {
  username: string;
  userPassword: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string[];

  constructor(
    username: string,
    fullName: string,
    email: string,
    address: string,
    phoneNumber: string,

    ) {
      this.username = username;
      this.fullName = fullName;
      this.email = email;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.userPassword = '123123';
      this.role = ['member'];
  }
}
