import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient) { }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>('/api/proyectos');
  }

  countProyectos(): Observable<number> {
    return this.http.get<number>('/api/proyectos/count');
  }

  addProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>('/api/proyecto', proyecto);
  }

  getProyecto(_id): Observable<Proyecto> {
    return this.http.get<Proyecto>(`/api/proyecto/${_id}`);
  }

  getProyectoByIdentificacion(identificacion): Observable<Proyecto> {
    return this.http.get<Proyecto>(`/api/proyecto/identificacion/${identificacion}`);
  }

  editProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.put(`/api/proyecto/${proyecto._id}`, proyecto, { responseType: 'text' });
  }

  deleteProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.delete(`/api/proyecto/${proyecto._id}`, { responseType: 'text' });
  }
  getProyectoDetail(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.get<Proyecto>(`/api/proyectodetail/${proyecto._id}`);
  }
  searchProyecto(identificacion): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`/api/sproyecto/identificacion/${identificacion}`);
  }
}
