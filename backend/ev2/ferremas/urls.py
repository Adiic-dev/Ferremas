from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import register_user, ProductoViewSet, PrecioProductoViewSet, CarritoViewSet, ItemCarritoViewSet

router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'precioproductos', PrecioProductoViewSet, basename='precioproducto')
router.register('carrito', CarritoViewSet, basename='carrito')
router.register('item-carrito', ItemCarritoViewSet, basename='item-carrito')

urlpatterns = [
    path('', include(router.urls)),                      # ← Agrega rutas CRUD para productos
    path('register_user/', register_user, name='register_user'),
]