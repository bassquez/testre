import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '../../../core';

@Component({
  selector: 'gp-contratista',
  templateUrl: './contratista.component.html',
  styleUrls: ['./contratista.component.scss'],
  animations: [routeAnimations]
})
export class ContratistaComponent implements OnInit {
  nav = [
    { link: 'admin-contratista', label: 'Administrar Contratista' },
    { link: 'add-contratista', label: 'Agregar Contratista' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
