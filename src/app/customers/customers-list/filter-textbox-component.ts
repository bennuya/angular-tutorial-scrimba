import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'filter-textbox',
    template: `
        Filter: <input type="text" [(ngModel)]="filter"/>
    `
})
export class FilterTextboxComponent implements OnInit {

    private _filter: string;

    @Input() get filter() {
        return this._filter;
    }

    set filter(val: string) {
        this._filter = val;
        // raise changed event
        // passes filter upwards to the parent
        // notifying the parent what the user is typing so they can do the filter
        this.changed.emit(this.filter);
    }

    // EventEmitter is a way for the child to send data up to a parent
    @Output() changed: EventEmitter<string> = new EventEmitter<string>();
     
    
    constructor() {}
    
    ngOnInit() {
        
    }
}