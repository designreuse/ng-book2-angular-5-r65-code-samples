export class Hero {

    constructor(
        public id: number,
        public name: string,
        public power: string,
        public alterEgo?: string
    ) { }

}


// 创建需要new的 类型 ，直接写在constructor 里面
// 1 TypeScript 编译器为每个public构造函数参数 ** 生成一个公共字段 **
// 2 在创建新的英雄实例时 ， 自动把参数值赋给这些公共字段
