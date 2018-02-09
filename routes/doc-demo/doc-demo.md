## page-not-found
path为** 的情况

## compose-message
router-outlet 出口不同的情况

## Heros
- 带参数路由
- 获取参数
    + `private route: ActivatedRoute`
    + `route.params.subscribe(params => { this.id = params['id']; console.log(this.id); });` 同步
    + `let id = this.route.snapshot.paramMap.get('id');` 快照，获取当前值 同步
    +      因为是订阅的，所以复用的时候，其他改变，这里也会改变
    
```javascript
    this.heroes$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        console.log('1.5')
        return this.service.getHeroes();
      });
``` 

- 导航带参数
    + `this.router.navigate(['/heros', { id: heroId, foo: 'foo' }]);` 矩阵参数
    + `this.router.navigate(['/heros', 11); ` 路由匹配

 

## crisis-center
1. 子路由

## admin 
- 如果它返回true，导航过程会继续
- 如果它返回false，导航过程会终止，且用户会留在原地。

- 用CanActivate来处理导航到某路由的情况。
- 用CanActivateChild来处理导航到某子路由的情况。
- 用CanDeactivate来处理从当前路由离开的情况.
- 用Resolve在路由激活之前获取路由数据。
- 用CanLoad来处理异步导航到某特性模块的情况。