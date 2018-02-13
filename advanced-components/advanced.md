## styling
```javascript
@Component({
    // 1. external-style
    styleUrls: ['./external-style.component.css'],

    // 2. inline-style
    styles: [`
        .highlight {
            border: 2px solid red;
            background-color: yellow;
            text-align: center;
            margin-bottom: 20px;
        }
    `],

    // 是否给样式加特性保护 ，Native -> shadow dom 的浏览器支持
    encapsulation: ViewEncapsulation.Native, 

    // None -> 否
    encapsulation: ViewEncapsulation.None,

    // 默认 添加特性( html + css特性选择器)
    encapsulation: ViewEncapsulation.Emulated
});
```

扩展(了解)：
- css到底是属性选择器，还是特性选择器
- shadowDOM

## host

## tabs

## lifecycle

## 