import { FuenteFinanciacionProyecto } from '../models/fuenteFinanciacionProyecto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FuenteFinanciacionProyectoService {
  constructor(private http: HttpClient){}

  getFuenteFinanciacionProyectos(): Observable<FuenteFinanciacionProyecto[]> {
    return this.http.get<FuenteFinanciacionProyecto[]>('/api/fuentesFinanaciacionProyecto');
  }

  countFuenteFinanciacionProyectos(): Observable<number> {
    return this.http.get<number>('/api/fuenteFinanaciacionProyecto/count');
  }

  addFuenteFinanciacionProyecto(fuenteFinanaciacionProyecto: FuenteFinanciacionProyecto): Observable<FuenteFinanciacionProyecto> {
    return this.http.post<FuenteFinanciacionProyecto>('/api/fuenteFinanaciacionProyecto', fuenteFinanaciacionProyecto);
  }
  getFuenteFinanciacionProyecto(idProyecto): Observable<FuenteFinanciacionProyecto[]> {
    return this.http.get<FuenteFinanciacionProyecto[]>(`/api/fuenteFinanaciacionProyecto/proyecto/${idProyecto}`);
  }

  editFuenteFinanciacionProyecto(fuenteFinanaciacionProyecto: FuenteFinanciacionProyecto): Observable<any> {
    return this.http.put(`/api/fuenteFinanaciacionProyecto/${fuenteFinanaciacionProyecto._id}`, fuenteFinanaciacionProyecto, { responseType: 'text' });
  }

  deleteFuenteFinanciacionProyecto(fuenteFinanaciacionProyecto: FuenteFinanciacionProyecto): Observable<any> {
    return this.http.delete(`/api/fuenteFinanaciacionProyecto/${fuenteFinanaciacionProyecto._id}`, { responseType: 'text' });
  }
}
