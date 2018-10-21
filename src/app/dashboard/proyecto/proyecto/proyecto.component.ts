import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '../../../core';

@Component({
  selector: 'gp-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
  animations: [routeAnimations]
})

export class ProyectoComponent implements OnInit {
  nav = [
    { link: 'admin-proyecto', label: 'Administrar Proyectos' },
    { link: 'add-proyecto', label: 'Agregar Proyecto' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
