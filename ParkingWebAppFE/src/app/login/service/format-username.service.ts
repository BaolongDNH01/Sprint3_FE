import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatUsernameService {
  removeVietnameseTones(inputString: string): string {
    inputString = inputString.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    inputString = inputString.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    inputString = inputString.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    inputString = inputString.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    inputString = inputString.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    inputString = inputString.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    inputString = inputString.replace(/đ/g, 'd');
    inputString = inputString.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    inputString = inputString.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    inputString = inputString.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    inputString = inputString.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    inputString = inputString.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    inputString = inputString.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    inputString = inputString.replace(/Đ/g, 'D');
    inputString = inputString.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
    inputString = inputString.replace(/\u02C6|\u0306|\u031B/g, '');
    inputString = inputString.replace(/ + /g, '');
    inputString = inputString.trim();
    inputString = inputString.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\'|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');
    return inputString;
  }
}
