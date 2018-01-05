import { Component } from '@angular/core';

@Component({
    selector: 'app-key-up',
    template: `
    keyup： <input (keyup)="onKey1($event)">
    <p>{{value1}}</p>

    loop-back: <input #boxLoop (keyup)="0">
    <p>{{boxLoop.value}}</p>

    keyup： <input #box2 (keyup)="onKey2(box2.value)">
    <p>{{value2}}</p>

    keyup.enter & blur & focus: <input #box3 (keyup.enter)="onEnter(box3.value)" (blur)="onBlur(box3.value)" (focus)="onFocus(box3.value)">
    <p>{{value3}}</p>
  `
})
export class KeyUpComponent {
    value1 = '';
    value2 = '';
    value3 = '';


    onKey1(event: KeyboardEvent) {
        // with type info
        this.value1 += (<HTMLInputElement>event.target).value + ' | ';
    }

    onKey2(value: string) {
        this.value2 += value + ' | ';
    }

    // keyup.enter  按下回车键的事件
    onEnter(value: string) {
        console.log('keyup.enter');
        this.value3 = value;
    }

    onBlur(value: string) {
        console.log('blur');
        this.value3 = value;
    }
    onFocus(value: string) {
        console.log('focus');
        this.value3 = value;
    }


}

