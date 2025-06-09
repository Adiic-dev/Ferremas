import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PrecioProducto {
  id: number;
  producto: number;
  fecha: string;
  valor: number;
}

export interface Producto {
  id: number;
  codigo: string;
  codigo_producto: string;
  marca: string;
  nombre: string;
  precios: PrecioProducto[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://44.207.144.184:8000/productos/';

  constructor(private http: HttpClient) {}

  

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = '';
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('authToken') || '';
    }
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

getProductos(): Observable<Producto[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Producto[]>(this.baseUrl, { headers }); // ❌ no maneja error
}
  crearProducto(producto: Partial<Producto>): Observable<Producto> {
    const headers = this.getAuthHeaders();
    return this.http.post<Producto>(this.baseUrl, producto, { headers });
  }

  eliminarProducto(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}${id}/`, { headers });
  }

  actualizarPrecioProducto(id: number, valor: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}${id}/actualizar_precio/`, { valor }, { headers });
  }
}
