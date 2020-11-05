import {Injectable} from '@angular/core';
import {User} from './User';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'http://localhost:8080';


  constructor(private httpClient: HttpClient) {
  }

  save(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + '/add-user', user);
  }
  findUserById(Id: number): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + '/user/' + Id);
  }

  listUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_URL + '/list-user');
  }

  delete(userId: number): Observable<User> {
    return this.httpClient.delete<User>(this.API_URL + '/delete-user/' + userId);
  }
}
