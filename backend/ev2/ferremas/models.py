import random
import string
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class Usuario(AbstractUser):
    rut = models.CharField(max_length=20, unique=True)
    celular = models.CharField(max_length=15)
    genero = models.CharField(max_length=20)
    


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return f"{self.username} ({self.rut})"
    
    pass


class Producto(models.Model):
    codigo_producto = models.CharField(max_length=20, unique=True, blank=True)
    codigo = models.CharField(max_length=20, unique=True, blank=True)
    nombre = models.CharField(max_length=100)
    marca = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        if not self.codigo_producto:
            # Por ejemplo, un UUID corto para código producto
            self.codigo_producto = str(uuid.uuid4())[:8].upper()
        if not self.codigo:
            # Otro código único, aquí puede ser un contador, o similar
            self.codigo = f"CP-{str(uuid.uuid4())[:6].upper()}"
        super().save(*args, **kwargs)

class PrecioProducto(models.Model):
    producto = models.ForeignKey(Producto, related_name='precios', on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    
class Carrito(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='carrito')
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Carrito de {self.usuario.username}"

class ItemCarrito(models.Model):
    carrito = models.ForeignKey(Carrito, related_name='items', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    def subtotal(self):
        precio_actual = self.producto.precios.last()
        return self.cantidad * (precio_actual.valor if precio_actual else 0)    