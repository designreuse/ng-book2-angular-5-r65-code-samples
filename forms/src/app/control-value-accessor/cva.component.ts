import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cva',
    templateUrl: './cva.component.html',
    styles: []
})
export class CvaComponent implements OnInit {

    age: string;

    inside: string;
    checkedValue: string;


    model;

    constructor() {
        this.age = '18';
        this.inside = 'inside init';
        this.checkedValue = 'a';
        this.model = {
            options: 1,
            checkbox: undefined
        };
    }

    ngOnInit() {
    }

    getModelChange(event: string) {
        // event 为value的值
        console.log(event)
        this.inside = event;
    }


    getpRadioChange(label) {
        console.log(`${label} -- pRadioChange`);
    }


}

