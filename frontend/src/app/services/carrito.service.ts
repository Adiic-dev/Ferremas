import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Producto {
  id: number;
  codigo_producto: string;
  codigo: string;
  nombre: string;
  marca: string;
  precios?: { id: number; fecha: string; valor: number }[];
}

export interface ItemCarrito {
  id?: number;
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiUrl = 'http://44.202.115.238:8000';

  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.cargarCarrito();
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

cargarCarrito() {
  const headers = this.getAuthHeaders();
  // Si no hay token, no intentes cargar el carrito
  if (!headers.has('Authorization')) {
    this.carritoSubject.next([]);
    return;
  }
  this.http.get<ItemCarrito[]>(`${this.apiUrl}/item-carrito/`, { headers }).subscribe(
    items => this.carritoSubject.next(items),
    () => this.carritoSubject.next([])
  );
}

  agregarProducto(producto: Producto, cantidad: number = 1): Observable<any> {
    const headers = this.getAuthHeaders();
    const items = this.carritoSubject.getValue();
    const itemExistente = items.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      const nuevaCantidad = itemExistente.cantidad + cantidad;
      return this.http.patch(
        `${this.apiUrl}/item-carrito/${itemExistente.id}/`,
        { cantidad: nuevaCantidad },
        { headers }
      ).pipe(tap(() => this.cargarCarrito()));
    } else {
      return this.http.post(
        `${this.apiUrl}/item-carrito/`,
        { producto: producto.id, cantidad },
        { headers }
      ).pipe(tap(() => this.cargarCarrito()));
    }
  }

  eliminarProducto(itemId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/item-carrito/${itemId}/`, { headers })
      .pipe(tap(() => this.cargarCarrito()));
  }

  vaciarCarrito(): Observable<void> {
    const items = this.carritoSubject.getValue();
    const borrados = items.map(item => this.eliminarProducto(item.id!));
    return new Observable(observer => {
      Promise.all(borrados.map(obs => obs.toPromise())).then(() => {
        this.carritoSubject.next([]);
        observer.next();
        observer.complete();
      });
    });
  }

  getTotal(): number {
    const items = this.carritoSubject.getValue();
    return items.reduce((total, item) => {
      const valor = item.producto.precios?.[0]?.valor || 0;
      return total + valor * item.cantidad;
    }, 0);
  }
}
