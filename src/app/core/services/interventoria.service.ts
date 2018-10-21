import { Interventoria } from '../models/interventoria.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterventoriaService {
  constructor(private http: HttpClient){}

  getInterventorias(): Observable<Interventoria[]> {
    return this.http.get<Interventoria[]>('/api/interventorias');
  }

  countInterventorias(): Observable<number> {
    return this.http.get<number>('/api/interventoria/count');
  }

  addInterventoria(interventoria: Interventoria): Observable<Interventoria> {
    return this.http.post<Interventoria>('/api/interventoria', interventoria);
  }
  getInterventoria(idProyecto): Observable<Interventoria[]> {
    return this.http.get<Interventoria[]>(`/api/interventoria/proyecto/${idProyecto}`);
  }

  editInterventoria(interventoria: Interventoria): Observable<any> {
    return this.http.put(`/api/interventoria/${interventoria._id}`, interventoria, { responseType: 'text' });
  }

  deleteInterventoria(interventoria: Interventoria): Observable<any> {
    return this.http.delete(`/api/interventoria/${interventoria._id}`, { responseType: 'text' });
  }
}
