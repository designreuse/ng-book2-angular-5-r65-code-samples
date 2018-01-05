import { Component, ViewChild } from '@angular/core';

import { Hero } from './hero';

@Component({
    selector: 'app-hero-form',
    templateUrl: './hero-form.component.html'
})
export class HeroFormComponent {

    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];

    model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

    submitted = false;

    @ViewChild('name') name;

    onSubmit() {
        this.submitted = true;
        console.log(this.name); //  ngModel
    }

    newHero() {
        this.model = new Hero(42, '', '');
    }
}

// 用ngModel可以获得比仅使用双向数据绑定更多的控制权
// 1. 用户碰过此控件吗？
// 2. 它的值变化了吗？
// 3. 数据变得无效了吗？ 
// 通过模版变量赋值指令 #name="ngModel" 可以访问
// 1. name.touched
// 2. name.pristine
// 3. name.valid 
