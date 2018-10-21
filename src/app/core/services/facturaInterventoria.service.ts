import { FacturaInterventoria } from '../models/facturaInterventoria.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaInterventoriaService {
  constructor(private http: HttpClient){}

  getFacturaInterventorias(): Observable<FacturaInterventoria[]> {
    return this.http.get<FacturaInterventoria[]>('/api/facturaInterventorias');
  }

  countFacturaInterventorias(): Observable<number> {
    return this.http.get<number>('/api/facturaInterventoria/count');
  }

  addFacturaInterventoria(facturaInterventoria: FacturaInterventoria): Observable<FacturaInterventoria> {
    return this.http.post<FacturaInterventoria>('/api/facturaInterventoria', facturaInterventoria);
  }
  getFacturaInterventoria(interventoria): Observable<FacturaInterventoria[]> {
    return this.http.get<FacturaInterventoria[]>(`/api/facturaInterventoria/interventoria/${interventoria}`);
  }

  editFacturaInterventoria(facturaInterventoria: FacturaInterventoria): Observable<any> {
    return this.http.put(`/api/facturaInterventoria/${facturaInterventoria._id}`, facturaInterventoria, { responseType: 'text' });
  }

  deleteFacturaInterventoria(facturaInterventoria: FacturaInterventoria): Observable<any> {
    return this.http.delete(`/api/facturaInterventoria/${facturaInterventoria._id}`, { responseType: 'text' });
  }
}
