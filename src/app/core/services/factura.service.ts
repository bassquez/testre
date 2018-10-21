import { Factura } from '../models/factura.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  constructor(private http: HttpClient){}

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>('/api/facturas');
  }

  countFacturas(): Observable<number> {
    return this.http.get<number>('/api/factura/count');
  }

  addFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>('/api/factura', factura);
  }
  getFactura(idProyecto): Observable<Factura[]> {
    return this.http.get<Factura[]>(`/api/factura/proyecto/${idProyecto}`);
  }

  getFactura2(idProyecto): Observable<Factura[]> {
    return this.http.get<Factura[]>(`/api/factura/proyecto2/${idProyecto}`);
  }


  getFacturaFuente(fuente, proyecto): Observable<Factura[]> {
    return this.http.get<Factura[]>(`/api/factura/fuente/${fuente}/${proyecto}`);
  }

  editFactura(factura: Factura): Observable<any> {
    return this.http.put(`/api/factura/${factura._id}`, factura, { responseType: 'text' });
  }

  deleteFactura(factura: Factura): Observable<any> {
    return this.http.delete(`/api/factura/${factura._id}`, { responseType: 'text' });
  }
}
