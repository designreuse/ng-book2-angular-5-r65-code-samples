import { Component } from '@angular/core';
import { Profile } from './profile.model';

@Component({
  selector: 'app-on-push-demo',
  template: `
  <div class="ui page grid">
    <div class="two column row">
      <div class="column area">
        <app-default-change-detection [profile]="profile1"></app-default-change-detection>
      </div>
      <div class="column area">
        <app-on-push-change-detection [profile]="profile2"></app-on-push-change-detection>
      </div>
    </div>
  </div>
  `
})
export class OnPushDemoComponent {
  profile1: Profile = new Profile('Linli', 'Ni');
  profile2: Profile = new Profile('Xixi', 'Lin');
}



// 每个组件，都会创建一个 change detector

// default
// 只要一个组件树中的任何一个组件（无论在哪里）发生了改变，Angular 组件树从 top component node 到 the bottom 上面的change detection 一次被触发。




// Zones

// Zones will automatically tell Angular that something changed under the most common scenarios(情形):
// 1. when a DOM Event occurs(like click, change, etc.)
// 2. when an HTTP request is resolved
// 3. when a Timer is triggered(setTimeout or setInterval) 

// Other scenarios(OnPush strategy can be very useful) out of the Zones control
// using a third party library that runs asynchronously
// immutable data
// Observables


// kick 踢 ， 效力

