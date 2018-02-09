import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';

// 存储路由的信息
interface RouteStorageObject {
    snapshot: ActivatedRouteSnapshot;
    handle: DetachedRouteHandle;
}

export class CustomReuseStrategy implements RouteReuseStrategy {

    private acceptedRoutes: string[] = ['tab1', 'tab2'];

    /**
     * 1. key 为 route.routeConfig.path
     * 2. value 为 RouteStorageObject对象
     */
    storedRoutes: { [key: string]: RouteStorageObject } = {};


    // 决定是否存储当前路由信息，true -> store
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log(route.routeConfig.path);
        let detach = true;
        console.log('detaching', route, 'return: ', detach);
        return detach;
    }

    // 具体存储
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        let storedRoute: RouteStorageObject = {
            snapshot: route,
            handle: handle
        };
        console.log('store:', storedRoute, 'into: ', this.storedRoutes);
        this.storedRoutes[route.routeConfig.path] = storedRoute;
    }


    // 决定是否还原请求路由信息 true -> retrieve
    shouldAttach(route: ActivatedRouteSnapshot): boolean {

        console.log('shouldAttach');
        console.log(route.routeConfig.path);
        // this will be true if the route has been stored before
        let canAttach: boolean = !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path];

        if (this.acceptedRoutes.indexOf(route.routeConfig.path) > -1) { }

        // this decides whether the route already stored should be rendered in place of the requested route, and is the return value
        // at this point we already know that the paths match because the storedResults key is the route.routeConfig.path
        // so, if the route.params and route.queryParams also match, then we should reuse the component
        if (canAttach) {
            let willAttach = true;
            console.log('param comparison:');
            console.log(this.compareObjects(route.params, this.storedRoutes[route.routeConfig.path].snapshot.params));
            console.log('query param comparison');
            console.log(this.compareObjects(route.queryParams, this.storedRoutes[route.routeConfig.path].snapshot.queryParams));

            let paramsMatch: boolean = this.compareObjects(route.params, this.storedRoutes[route.routeConfig.path].snapshot.params);
            let queryParamsMatch: boolean = this.compareObjects(route.queryParams, this.storedRoutes[route.routeConfig.path].snapshot.queryParams);

            console.log('deciding to attach...', route, 'does it match?', this.storedRoutes[route.routeConfig.path].snapshot, 'return: ', paramsMatch && queryParamsMatch);
            return paramsMatch && queryParamsMatch;
        } else {
            return false;
        }
    }

    // 具体还原
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

        // return null if the path does not have a routerConfig OR if there is no stored route for that routerConfig
        if (!route.routeConfig || !this.storedRoutes[route.routeConfig.path]) return null;
        console.log('retrieving', 'return: ', this.storedRoutes[route.routeConfig.path]);

        /** returns handle when the route.routeConfig.path is already stored */
        return this.storedRoutes[route.routeConfig.path].handle;
    }

    /**
     * Determines whether or not the current route should be reused
     * @param future The route the user is going to, as triggered by the router
     * @param curr The route the user is currently on
     * @returns boolean basically indicating true if the user intends to leave the current route
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        console.log('deciding to reuse', 'future', future.routeConfig, 'current',
            curr.routeConfig, 'return: ', future.routeConfig === curr.routeConfig);
        return future.routeConfig === curr.routeConfig;
    }

    /**
     * This nasty bugger finds out whether the objects are _traditionally_ equal to each other, 
     * like you might assume someone else would have put this function in vanilla JS already
     * One thing to note is that it uses coercive comparison (==) on properties which both objects have, not strict comparison (===)
     * Another important note is that the method only tells you if `compare` has all equal parameters to `base`, not the other way around
     * @param base The base object which you would like to compare another object to
     * @param compare The object to compare to base
     * @returns boolean indicating whether or not the objects have all the same properties and those properties are ==
     */
    private compareObjects(base: any, compare: any): boolean {

        // loop through all properties in base object
        for (let baseProperty in base) {

            // determine if comparrison object has that property, if not: return false
            if (compare.hasOwnProperty(baseProperty)) {
                switch (typeof base[baseProperty]) {
                    // if one is object and other is not: return false
                    // if they are both objects, recursively call this comparison function
                    case 'object':
                        if (typeof compare[baseProperty] !== 'object' ||
                            !this.compareObjects(base[baseProperty], compare[baseProperty])) { return false; } break;
                    // if one is function and other is not: return false
                    // if both are functions, compare function.toString() results
                    case 'function':
                        if (typeof compare[baseProperty] !== 'function' ||
                            base[baseProperty].toString() !== compare[baseProperty].toString()) { return false; } break;
                    // otherwise, see if they are equal using coercive comparison
                    default:
                        if (base[baseProperty] !== compare[baseProperty]) { return false; }
                }
            } else {
                return false;
            }
        }

        // returns true only after false HAS NOT BEEN returned through all loops
        return true;
    }
}
