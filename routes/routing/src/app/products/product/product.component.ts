import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  id: string;

  constructor(private route: ActivatedRoute) {
    console.log('a');
    route.params.subscribe(params => { this.id = params['id']; console.log(this.id); });
    console.log('b');

  }
}
