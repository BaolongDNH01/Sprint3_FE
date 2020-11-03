import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API_URL = 'http://localhost:8080/';
  constructor(private  httpClient: HttpClient) { }
  findAll(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.API_URL + 'all-customer');
  }
  findById(id: number): Observable<Customer>{
    return this.httpClient.get<Customer>(this.API_URL + 'customer/' + id);
  }
  createCustomer(customer: Customer): Observable<void>{
    return this.httpClient.post<void>(this.API_URL + 'add-customer', customer);
  }
  deleteCustomer(id: number): Observable<any>{
    return this.httpClient.delete(this.API_URL + 'delete-customer/' + id);
  }
  findByLicense(license: string): Observable<Customer>{
    return this.httpClient.get<Customer>(this.API_URL + 'find-customer/' + license);
  }
  editCustomer(customer: Customer): Observable<void>{
    return this.httpClient.post<void>(this.API_URL + 'edit-customer', customer);
  }
}
