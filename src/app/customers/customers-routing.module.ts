import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
    { path: 'customers', component: CustomersComponent }
];

@NgModule({
    imports: [
        // register routes with forRoot
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CustomersRoutingModule {

}