## why need
- separate different areas of the app
- maintain the state in the app
- protect areas of the app based on certain rules

如果没有路由，不能做什么
- You wouldn’t be able to refresh the page and keep your location within the app
- You wouldn’t be able to bookmark a page and come back to it later
- You wouldn’t be able to share the URL of that page with others

## 区别
服务器端的routes 和 客户端的routes区别
- 服务器端每次都要发送http-request
- 客户端不用发送，js渲染页面

客户端：
Client-side routing started out with a clever hack: we use the anchor tag as the client-side URL  
`<a name="about"></a>`
- make the browser scroll all the way to where that anchor was defined (在挂了服务器访问  xxx#about)

## Components routing
- Routes: describes the routes our application supports
- RouterOutlet: is a “placeholder” component that shows Angular where to put the content of
each route
- RouterLink: directive is used to link to routes

## 常见模块
### base标签
因为路由中需要用到,并没有找到什么理由一定要设置base

### 配置模块
type Routes = Route[]; 关系
1. `Routes` Routes is an array of route configurations. 
2. `Route` 
    - path ：(不能以/ 开头)
    - component : is what ties a given route path to a component that will handle the route
    - redirectTo :
    - pathMatch :

3. `ActiveRoute` : 当前Route

### AppModule中import Routes模块
`RouterModule`模块
- static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders
- static forChild(routes: Routes): ModuleWithProviders


## html a标签中使用
`<a [routerLink]="['/products']">Products</a>`


## Hash风格
1. import时候 `RouterModule.forRoot(routes, { useHash: true })`
2. `provides:[ { provide: LocationStrategy, useClass: HashLocationStrategy }] `





