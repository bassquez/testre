import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contratista } from '../models/contratista';

@Injectable()
export class ContratistaService {

  constructor(private http: HttpClient) { }

  getContratistas(): Observable<Contratista[]> {
    return this.http.get<Contratista[]>('/api/contratistas');
  }

  countContratistas(): Observable<number> {
    return this.http.get<number>('/api/contratistas/count');
  }

  addContratista(contratista: Contratista): Observable<Contratista> {
    return this.http.post<Contratista>('/api/contratista', contratista);
  }
  getContratista(contratista: Contratista): Observable<Contratista> {
    return this.http.get<Contratista>(`/api/contratista/${contratista._id}`);
  }

  getContratistaId(identificacion): Observable<Contratista> {
    return this.http.get<Contratista>(`/api/contratista/id/${identificacion}`);
  }

  editContratista(contratista: Contratista): Observable<any> {
    return this.http.put(`/api/contratista/${contratista._id}`, contratista, { responseType: 'text' });
  }

  deleteContratista(contratista: Contratista): Observable<any> {
    return this.http.delete(`/api/contratista/${contratista._id}`, { responseType: 'text' });
  }

}
