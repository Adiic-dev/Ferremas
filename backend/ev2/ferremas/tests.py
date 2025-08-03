from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Producto, PrecioProducto
from decimal import Decimal

User = get_user_model()


class BasicModelTest(TestCase):
    """Pruebas básicas para los modelos principales"""
    
    def test_crear_usuario(self):
        """Prueba que se puede crear un usuario"""
        usuario = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123',
            rut='12345678-9'
        )
        self.assertEqual(usuario.username, 'testuser')
        self.assertEqual(usuario.rut, '12345678-9')
        self.assertTrue(usuario.check_password('testpass123'))

    def test_crear_producto_con_precio(self):
        """Prueba que se puede crear un producto con precio"""
        producto = Producto.objects.create(
            nombre='Martillo',
            marca='Stanley'
        )
        precio = PrecioProducto.objects.create(
            producto=producto,
            valor=Decimal('25000.00')
        )
        
        self.assertEqual(producto.nombre, 'Martillo')
        self.assertEqual(producto.marca, 'Stanley')
        self.assertIsNotNone(producto.codigo_producto)
        self.assertEqual(precio.valor, Decimal('25000.00'))
