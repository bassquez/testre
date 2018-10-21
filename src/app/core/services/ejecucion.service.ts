import { Ejecucion } from '../models/ejecucion.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EjecucionService {
  constructor(private http: HttpClient){}

  getEjecucions(): Observable<Ejecucion[]> {
    return this.http.get<Ejecucion[]>('/api/ejecuciones');
  }

  countEjecucions(): Observable<number> {
    return this.http.get<number>('/api/ejecucion/count');
  }

  addEjecucion(ejecucion: Ejecucion): Observable<Ejecucion> {
    return this.http.post<Ejecucion>('/api/ejecucion', ejecucion);
  }
  getEjecucion(idProyecto): Observable<Ejecucion[]> {
    return this.http.get<Ejecucion[]>(`/api/ejecucion/proyecto/${idProyecto}`);
  }

  editEjecucion(ejecucion: Ejecucion): Observable<any> {
    return this.http.put(`/api/ejecucion/${ejecucion._id}`, ejecucion, { responseType: 'text' });
  }

  deleteEjecucion(ejecucion: Ejecucion): Observable<any> {
    return this.http.delete(`/api/ejecucion/${ejecucion._id}`, { responseType: 'text' });
  }
}
