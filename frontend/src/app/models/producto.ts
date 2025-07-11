export interface PrecioProducto {
  id: number;
  fecha: string;
  valor: number;
}

export interface Producto {
  id: number;
  codigo: string;
  codigo_producto: string;
  marca: string;
  nombre: string;
  precios: PrecioProducto[]; // ✅ Usa la interfaz completa
}