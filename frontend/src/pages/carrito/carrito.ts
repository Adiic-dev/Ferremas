import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../app/services/carrito.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.scss']
})
export class CarritoComponent implements OnInit {
  carrito$: Observable<ItemCarrito[]>;

  constructor(private carritoService: CarritoService, private router: Router) {
    this.carrito$ = this.carritoService.carrito$;
  }

  ngOnInit(): void {
    this.carritoService.cargarCarrito();
  }

  volverAlCatalogo() {
    this.router.navigate(['/home']);
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id).subscribe();
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito().subscribe();
  }

  getTotal(items: ItemCarrito[]): number {
    return items.reduce((total, item) => {
      const valor = item.producto.precios?.[0]?.valor || 0;
      return total + valor * item.cantidad;
    }, 0);
  }

  comprar(): void {
  this.carritoService.vaciarCarrito().subscribe(() => {
    alert('Gracias por su compra');
  }, err => {
    alert('Error al procesar la compra: ' + (err.message || err.statusText));
  });
}
}