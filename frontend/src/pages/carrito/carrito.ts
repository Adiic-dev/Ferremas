import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../app/services/carrito.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.scss']
})
export class CarritoComponent implements OnInit {
  carrito$: Observable<ItemCarrito[]>;
  showPaymentModal = false;
  showSuccessModal = false;
  
  // Datos del formulario de pago
  paymentData = {
    methodType: 'debito', // Solo débito ahora
    deliveryType: 'envio',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    phone: ''
  };

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

  // Método actualizado para abrir el modal
  comprar(): void {
    this.showPaymentModal = true;
  }

  // Cerrar modal
  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.resetPaymentData();
  }

  // Resetear datos del formulario
  resetPaymentData(): void {
    this.paymentData = {
      methodType: 'debito', // Solo débito
      deliveryType: 'envio',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      address: '',
      phone: ''
    };
  }

  // Procesar pago
  processPayment(): void {
    // Simulación del proceso de pago
    this.carritoService.vaciarCarrito().subscribe(() => {
      this.showPaymentModal = false;
      this.showSuccessModal = true;
      this.resetPaymentData();
    }, err => {
      alert('Error al procesar la compra: ' + (err.message || err.statusText));
    });
  }

  // Cerrar modal de éxito
  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  // Ir al inicio después del pago
  goToHome(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/home']);
  }

  // Formatear número de tarjeta
  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    this.paymentData.cardNumber = formattedValue;
  }

  // Formatear fecha de expiración
  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.paymentData.expiryDate = value;
  }
}