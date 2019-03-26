import { Component, OnInit, Input } from '@angular/core';
import { ICustomer } from 'src/app/shared/interface';
import { SorterService } from 'src/app/core/sorter.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  // backing data store
  private _customers: ICustomer[] = [];

  // allows us to get the value of _customers
  @Input() get customers(): ICustomer[] {
    return this._customers;
  }

  // assigns two things
  // filteredCustomers & _customers
  set customers(value: ICustomer[]) {
    if (value) {
      this.filteredCustomers = this._customers = value;
      this.calcOrders();
    }
  }

  filteredCustomers: any[] = [];
  customersOrderTotal: number;
  currencyCode: string = 'CHF';

  constructor(
    private sorterService: SorterService
  ) { }

  ngOnInit() {
  }


  calcOrders() {
    this.customersOrderTotal = 0;
    this.filteredCustomers.forEach((cust: ICustomer) => {
      this.customersOrderTotal += cust.orderTotal;
    });
  }

  filter(data: string) {
    if (data) {
      this.filteredCustomers = this.customers.filter((cust: ICustomer) => {
        return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          cust.orderTotal.toString().indexOf(data) > -1;
      });
    } else {
      this.filteredCustomers = this.customers;
    }
    this.calcOrders();
  }

  sort(property: string) {
    this.sorterService.sort(this.filteredCustomers, property);
  }

}
