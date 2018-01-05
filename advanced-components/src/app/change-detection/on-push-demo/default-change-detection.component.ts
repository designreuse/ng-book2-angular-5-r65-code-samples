import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Profile } from './profile.model';


@Component({
  selector: 'app-default-change-detection',
  changeDetection: ChangeDetectionStrategy.Default, // 组件声明的时候，设置changeDetection
  templateUrl: './default-change-detection.component.html'
})
export class DefaultChangeDetectionComponent {
  @Input() profile: Profile;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }


  getFirstChange(firstname: string) {
    if (firstname === 'detach') {
      console.log('detach');  // 拆掉
      this.cdRef.detach();
    } else if (firstname === 'reattach') {
      console.log('reattach'); // 重新装上
      this.cdRef.reattach();
    }
  }
  getLastChange(lastname: string) {
    if (lastname === 'detectChanges') {
      console.log('detectChanges');
      this.cdRef.detectChanges();
      // Checks the change detector and its children. （detach了之后依然有效）
      //  1 The change detector is detached from the view ( see detach )
      // 2 An update has happened but it hasn't been inside the Angular Zone hence Angular doesn't know about it.
    }
  }

}


// Angular checks for changes from the top to the bottom, so it queried first OnPushDemoComponent,
// OnPushChangeDetectionComponent changed, 从上到下刷新所有的组件树, DefaultChangeDetectionComponent 刷新


