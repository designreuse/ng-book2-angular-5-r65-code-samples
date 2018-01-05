import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Profile } from './profile.model';

@Component({
  selector: 'app-on-push-change-detection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './on-push-change-detection.component.html'
})
export class OnPushChangeDetectionComponent {
  @Input() profile: Profile;
}


// . This happened because when we set
// DefaultChangeDetectionComponent change， 
// 设置了 OnPush strategy
// 自己input attributes changes 发生了改变才会改变
// 其他的组件 input attributes change改变 ，从上到下，此组件不会改变
