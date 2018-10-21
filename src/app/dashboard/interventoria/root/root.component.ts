import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '../../../core';

@Component({
  selector: 'gp-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [routeAnimations]
})
export class RootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
