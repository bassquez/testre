import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { Proyecto } from '../../../core/models/proyecto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'gp-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {


  proyectos: Proyecto[] = [];

  proyecto: Proyecto;
  sProyecto = '';

  constructor(
    private proyectoService: ProyectoService,
    public router: Router

  ) { }

  ngOnInit() {
    this.search();
  }
  getProyectos() {
    this.proyectoService.getProyectos().subscribe(
      data => this.proyectos = data,
      error => console.log(error)
    );
  }
  search() {
    if (this.sProyecto === '') {
      this.getProyectos();
    } else {
      this.proyectoService.searchProyecto(this.sProyecto).subscribe(
        data => this.proyectos = data,
        error => console.log(error)
      );
    }

  }
  factura(proyecto) {
    this.router.navigate(['/dashboard/factura/facturas/' + proyecto.identificacion]);

  }
}
