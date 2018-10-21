import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from '../../../core/models/proyecto.model';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { MatDialog } from '@angular/material';
import { ModalDetalleProyectoComponent } from '../modal-detalle-proyecto/modal-detalle-proyecto.component';
import { ModalEditarProyectoComponent } from '../modal-editar-proyecto/modal-editar-proyecto.component';

@Component({
  selector: 'gp-admin-proyecto',
  templateUrl: './admin-proyecto.component.html',
  styleUrls: ['./admin-proyecto.component.scss']
})
export class AdminProyectoComponent implements OnInit {


  proyectos: Proyecto[] = [];
  isLoading = true;
  proyecto: string;
  sProyecto = '';
  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private proyectoService: ProyectoService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    this.search();
  }

  ngAfterContentInit() {
    
  }
  openDialogDetalle(proyecto) {
    this.dialog.open(ModalDetalleProyectoComponent, {
      width: '100vw',
      data: {
        proyecto: proyecto
      }
    });
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
  openDialogEditar(proyecto) {
    const dialogRef = this.dialog.open(ModalEditarProyectoComponent, {
      width: '100vw',
      data: {
        proyecto: proyecto
      }
    });

    dialogRef.afterClosed().subscribe(
      result => this.getProyectos()
    );
  }
  getProyectos() {
    this.proyectoService.getProyectos().subscribe(
      data => this.proyectos = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteProyecto(proyecto: Proyecto) {
    if (window.confirm('Estás segur@ que quieres Eliminar ' + proyecto.identificacion + '?')) {
      this.proyectoService.deleteProyecto(proyecto).subscribe(
        data => this.toast.setMessage('proyecto deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getProyectos()
      );
    }
  }

  interventorias(proyecto: Proyecto) {
    this.router.navigate(['/dashboard/interventoria/interventorias/' + proyecto.identificacion]);
  }

  facturas(proyecto: Proyecto) {
    this.router.navigate(['/dashboard/factura/facturas/' + proyecto.identificacion]);
  }

}
