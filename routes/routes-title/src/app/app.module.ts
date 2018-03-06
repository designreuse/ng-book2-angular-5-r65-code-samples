import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbcComponent } from './abc/abc.component';
import { DefComponent } from './def/def.component';
import { HijComponent } from './hij/hij.component';


import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'abc', pathMatch: 'full' },
  { path: 'abc', component: AbcComponent, data: { title: 'abc title' } },
  { path: 'def/:id', component: DefComponent, data: { title: 'def title' } },
  { path: 'hij', component: HijComponent, data: { title: 'hij.title' } },
  { path: '**', redirectTo: 'abc' }
];


@NgModule({
  declarations: [
    AppComponent,
    AbcComponent,
    DefComponent,
    HijComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
