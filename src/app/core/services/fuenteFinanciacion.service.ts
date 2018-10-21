import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FuenteFinanciacion } from '../models/fuenteFinanciacion.model';

@Injectable({
  providedIn: 'root'
})
export class FuenteFinanciacionService {

  constructor(private http: HttpClient) { }

  getFuenteFinanciacions(): Observable<FuenteFinanciacion[]> {
    return this.http.get<FuenteFinanciacion[]>('/api/fuentesFinanciacion');
  }

  countFuenteFinanciacions(): Observable<number> {
    return this.http.get<number>('/api/fuentesFinanciacion/count');
  }

  addFuenteFinanciacion(fuenteFinanciacion: FuenteFinanciacion): Observable<FuenteFinanciacion> {
    return this.http.post<FuenteFinanciacion>('/api/fuenteFinanciacion', fuenteFinanciacion);
  }

  getFuenteFinanciacion(fuenteFinanciacion: FuenteFinanciacion): Observable<FuenteFinanciacion> {
    return this.http.get<FuenteFinanciacion>(`/api/fuenteFinanciacion/${fuenteFinanciacion._id}`);
  }

  editFuenteFinanciacion(fuenteFinanciacion: FuenteFinanciacion): Observable<any> {
    return this.http.put(`/api/fuenteFinanciacion/${fuenteFinanciacion._id}`, fuenteFinanciacion, { responseType: 'text' });
  }

  deleteFuenteFinanciacion(fuenteFinanciacion: FuenteFinanciacion): Observable<any> {
    return this.http.delete(`/api/fuenteFinanciacion/${fuenteFinanciacion._id}`, { responseType: 'text' });
  }

}
