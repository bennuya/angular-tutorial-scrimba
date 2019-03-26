import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { ICustomer, IOrder } from '../shared/interface';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

    baseUrl: string = 'assets/';
    
    constructor(
      private http: HttpClient
    ) { }

    // return type Observable with generic ICustomer[] (array)
    getCustomers() : Observable<ICustomer[]> {
      // return Observable
      return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json')
      .pipe(
        // pipe with Operators
        // pipe full of water if there is an error floating on top, filter the error out using operators
        catchError(this.handleError)
      );
    }

    getCustomer(id: number) : Observable<ICustomer> {
      // we expect all customers ICustomers[]
      return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json')
      .pipe(
        // will map customers into callback func and return actual customer that we want
        map(customers => {
          // checks if there is an customer with same id as parsed above
          let customer = customers.filter((cust: ICustomer) => cust.id === id);
          // if customer has length = is not empty, then return first customer
          // otherwise return null because there is no existing customer with same id
          return (customer && customer.length) ? customer[0] : null;
        }),
        catchError(this.handleError)
      );
    }

    getOrders(id: number) : Observable<IOrder[]> {
      return this.http.get<IOrder[]>(this.baseUrl + 'orders.json')
      .pipe(
        map(orders => {
          let custOrders = orders.filter((order: IOrder) => order.customerId === id);
          return custOrders;
        }),
        catchError(this.handleError)
      );
    }

    private handleError(error: any) {
      console.error('server error:', error);
      if (error.error instanceof Error) {
          const errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          // return Observable.throw(err.text() || 'backend server error');
      }
      return Observable.throw(error || 'Node.js server error');
    }

}