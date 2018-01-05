# [Angular笔记] 自定义组件上使用 [(ngModel)] 


## [(ngModel)]
`[(ngModel)]` 将`[]`输入`()`输出组合起来，进行双向数据绑定。拆分开来
1. 输入属性`[ngModel]`
2. `(ngModelChange)`输出监听元素值的变化，并同步view value与model value
可以达到和[(ngModel)]一样的效果
```html
<div class="ui raised segment">
  <h2 class="ui header">Inside [(ngModel)]</h2>
  <div class="field">
    <label for="modelInner">拆分[(ngModel)]:</label>
    <input type="text" id="modelInner" [ngModel]="inside" (ngModelChange)="getModelChange($event)">
  </div>
</div>
```
```typescript
    inside: string;

    constructor() {
        this.inside = 'inside init';
    }

    getModelChange(event: string) {
        this.inside = event;  // view value 与 model value 同步
    }
```

## 自定义组件上使用 [(ngModel)] 
> 我们不能把[(ngModel)]用到非表单类的原生元素或第三方自定义组件上，除非写一个合适的值访问器，这种技巧超出了本章的范围。

Angular文档中描述到这里，就中止了。刚好我要定制一个模拟radio的组件，只能去如文档所说，写一个合适的 `ControlValueAccessor`。


## ControlValueAccessor
> A ControlValueAccessor acts as a bridge between the Angular forms API and a native element in the DOM.  
Implement this interface if you want to create a custom form control directive that integrates with Angular forms.  

简而言之，实现了这个接口的组件，就可以使用  Angular forms API，比如`[(ngModel)] `。


## ControlValueAccessor Interface 概况
```typescript
interface ControlValueAccessor { 
  writeValue(obj: any): void
  registerOnChange(fn: any): void
  registerOnTouched(fn: any): void
  setDisabledState(isDisabled: boolean)?: void
}
```
## 实现ControlValueAccessor步骤
1. 创建一个`RADIO_VALUE_ACCESSOR`常量用来在组件中注册`NG_VALUE_ACCESSOR`
2. 实现`ControlValueAccessor`中的3+1个方法

简版demo代码：
```typescript
import { NgModule, Component, Input, Output, ElementRef, OnInit, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PRadioComponent),
  multi: true
};

@Component({
  selector: 'app-p-radio',
  template: `
        <div class="p-radio">
            <label class="radio-label" (click)="select()" *ngIf="label">
                <div class="name" [class.checked-name]="rb.checked">{{label}}</div>
            </label>
            <div class="helper-hidden-accessible">
                <input #rb type="radio" [attr.name]="name" [attr.value]="value" [checked]="checked">
            </div>
            <div class="radio-md" (click)="handleClick()">
                <div class="radio-icon " [class.radio-checked]="rb.checked">
                     <div class="radio-inner"></div>
                </div>
            </div>
        </div>
    `,
  styleUrls: ['./p-radio.component.scss'],
  providers: [RADIO_VALUE_ACCESSOR]
})
export class PRadioComponent implements ControlValueAccessor {

  @Input() name: string;
  @Input() label: string;
  @Input() value: string;
  checked: boolean;

  @ViewChild('rb') inputViewChild: ElementRef;
  @Output() pRadioChange: EventEmitter<any> = new EventEmitter();
  onModelChange: Function = () => { };

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  // model view -> view value
  writeValue(value: any): void {
    if (value) {
      this.checked = (value === this.value);
      if (this.inputViewChild.nativeElement) {
        this.inputViewChild.nativeElement.checked = this.checked;
      }
      this.cd.markForCheck();
    }
  }

  // view value ->model value
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void { }


  handleClick() {
    this.select();
  }

  select() {
    this.inputViewChild.nativeElement.checked = !this.inputViewChild.nativeElement.checked;
    this.checked = !this.checked;
    if (this.checked) {
      this.onModelChange(this.value); // 改变model value
    } else {
      this.onModelChange(null);
    }
    this.pRadioChange.emit(null);
  }

}

@NgModule({
  imports: [CommonModule],
  exports: [PRadioComponent],
  declarations: [PRadioComponent]
})

export class RadioButtonModule { }
```

## 方法何时被调用？

1. writeValue(obj: any): void
API中提到 (model -> view) 时，`writeValue()` 会被调用。
model value 和 view value分别指什么？举个调用`PRadioComponent`的例子：
```html
  <app-p-radio [value]="'1'" [label]="'text1'" [(ngModel)]="checkedValue"></app-p-radio>
```
这里`checkedValue`就是model value,view value 为`PRadioComponent`内部的某个属性。
当这个model view发生改变时,`PRadioComponent`中的`writeValue(obj: any)`就会被调用，参数为当前model value的值，在函数将参数赋值给内部的view value，从而实现(model -> view)。
接受到model value的值后，改变`PRadioComponent`的UI显示。


2. registerOnChange(fn: any): void
这个方法的作用是同步 view value 和 model value (view -> model)，

```typescript
 registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }
```
调用`this.onModelChange()`时候，将view value当作参数传入此方法中，即完成了同步。


3. registerOnTouched(fn: any): void
这个方法没有用到，但是是必须实现，所以写了一个空函数。

## 实际效果





## 步骤
1   NG_VALUE_ACCESSOR: Used to provide a ControlValueAccessor for form controls.
```
import {
  NgModule, Component, Input, Output, ElementRef, OnInit, EventEmitter,
  forwardRef, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

// NG_VALUE_ACCESSOR 访问其值 / NG_VALIDATORS 成为表单控件
const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PRadioComponent),
  multi: true
};

@Component({
  selector: 'app-p-radio',
  template: `
        <div class="p-radio">
            <label class="radio-label" (click)="select()" *ngIf="label">
                <div class="name" [class.checked-name]="rb.checked">{{label}}</div>
            </label>
            <div class="helper-hidden-accessible">
                <input #rb type="radio" [attr.name]="name" [attr.value]="value" [checked]="checked">
            </div>
            <div class="radio-md" (click)="handleClick()">
                <div class="radio-icon " [class.radio-checked]="rb.checked">
                     <div class="radio-inner"></div>
                </div>
            </div>
        </div>
    `,
  styleUrls: ['./p-radio.component.scss'],
  providers: [RADIO_VALUE_ACCESSOR]
})
export class PRadioComponent implements ControlValueAccessor {
```
