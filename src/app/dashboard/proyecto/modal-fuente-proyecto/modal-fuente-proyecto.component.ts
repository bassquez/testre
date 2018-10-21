import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FuenteFinanciacionProyecto } from '../../../core/models/fuenteFinanciacionProyecto.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FuenteFinanciacionService } from '../../../core/services/fuenteFinanciacion.service';
import { FuenteFinanciacion } from '../../../core/models/fuenteFinanciacion.model';
import { ToastComponent } from '../../../shared/toast/toast.component';

export interface FuenteProyecto{
  idProyecto: string;
  fuenteProyecto: any[];
  inversion: number;
}

@Component({
  selector: 'gp-modal-fuente-proyecto',
  templateUrl: './modal-fuente-proyecto.component.html',
  styleUrls: ['./modal-fuente-proyecto.component.scss']
})
export class ModalFuenteProyectoComponent implements OnInit {

  fuentesFinanciacion: FuenteFinanciacion[] = [];

  inversion: number;
  constructor(
    public dialogRef: MatDialogRef<ModalFuenteProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FuenteProyecto,
    private fuenteFinanciacionService: FuenteFinanciacionService,
    private formBuilder: FormBuilder,
  public toast: ToastComponent,
  ) {}
  
  ngOnInit() {
    this.getfuentesFinanciacion();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getfuentesFinanciacion() {
    this.fuenteFinanciacionService.getFuenteFinanciacions().subscribe(
      data => this.fuentesFinanciacion = data,
      error => console.log(error)
    );
  }
}
