import { Component } from '@angular/core';
import { CrisisListComponent } from './crisis-list.component';

@Component({
  template: `
    <h2>CRISIS CENTER</h2>
    <app-crisis-list></app-crisis-list>
    <router-outlet></router-outlet>
  `
})
export class CrisisCenterComponent { }
