import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '../../../core';

@Component({
  selector: 'gp-fuente-financiacion',
  templateUrl: './fuente-financiacion.component.html',
  styleUrls: ['./fuente-financiacion.component.scss'],
  animations: [routeAnimations]
})
export class FuenteFinanciacionComponent implements OnInit {
  nav = [
    { link: 'admin-fuente-financiacion', label: 'Administrar Fuentes financiacion' },
    { link: 'add-fuente-financiacion', label: 'Agregar Fuentes financiacion' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
