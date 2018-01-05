import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-demo-form-ng-model',
  templateUrl: './demo-form-ng-model.component.html'
})
export class DemoFormNgModelComponent {
  myForm: FormGroup;
  productName: string;

  

  constructor(fb: FormBuilder) {

  
    this.myForm = fb.group({
      'productName': ['', Validators.required]
    });
  }



  onSubmit(value: string): void {
    console.log('you submitted value: ', value);
  }
}

// input: ngModel输入属性会设置该元素的值
// output:  并通过ngModelChange的输出属性来监听元素值的变化

// NgModel指令只支持实现了ControlValueAccessor的元素 ,input
// 自定义的话：除非写一个合适的值访问器 Value accessor
