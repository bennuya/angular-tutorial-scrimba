import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../shared/interface';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  title: string;


  // only for us devs
  // helps us to compile
  // anything we parse into to peoples array has to match the interfaces
  people: ICustomer[];

  constructor(
    // Injectable makes it so we can just declare dataservice in constructor of compoments
    // we don't have to create it we can just use it like that
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.title = 'Customers';

    // dataService returns has getCustomers()
    // returns an Observable
    // is async
    this.dataService.getCustomers()
      // pass customers that subscribe gives to us into people
      .subscribe((customers: ICustomer[]) => this.people = customers);
    /* this.people = [
      { id: 1, name: 'john Doe', city: 'Phoenix', orderTotal: 9.99, customerSince: new Date(2014, 7, 10) },
      { id: 2, name: 'Jane Doe', city: 'Chandler', orderTotal: 10.99, customerSince: new Date(2017, 2, 22) },
      { id: 3, name: 'Thomas Hi', city: 'Seattle', orderTotal: 99.99, customerSince: new Date(2002, 7, 31) },
      { id: 4, name: 'Jim Good', city: 'New York', orderTotal: 599.99, customerSince: new Date(202, 10, 31) }
    ]; */
  }

}
