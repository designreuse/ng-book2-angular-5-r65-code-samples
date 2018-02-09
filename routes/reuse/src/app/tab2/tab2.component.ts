import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit {

  // id:string;

  constructor(
    private route:ActivatedRoute
  ) { 
    // this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
