import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.router.routerState.root)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      // .filter((route) => route.outlet === 'primary')
      // .mergeMap((route) => route.data)
      .subscribe((event) => console.log(event));
  }



}
