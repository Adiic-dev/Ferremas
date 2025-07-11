from django.shortcuts import render
from .serializers import UserRegistrationSerializer, ProductoSerializer, PrecioProductoSerializer, CarritoSerializer, ItemCarritoSerializer, ItemCarritoCreateUpdateSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Producto, PrecioProducto, Carrito, ItemCarrito
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework import serializers


@api_view(["POST"])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    @action(detail=True, methods=['put'])
    def actualizar_precio(self, request, pk=None):
        producto = self.get_object()
        nuevo_valor = request.data.get('valor')
        if nuevo_valor is None:
            return Response({'error': 'Falta valor de precio'}, status=status.HTTP_400_BAD_REQUEST)

        # Actualizar el precio más reciente
        precio_actual = producto.precios.order_by('-fecha').first()
        if precio_actual:
            precio_actual.valor = nuevo_valor
            precio_actual.save()
            return Response({'msg': 'Precio actualizado'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No existe precio para actualizar'}, status=status.HTTP_404_NOT_FOUND)
    
class PrecioProductoViewSet(viewsets.ModelViewSet):
    queryset = PrecioProducto.objects.all()
    serializer_class = PrecioProductoSerializer    
    
class CarritoViewSet(viewsets.ModelViewSet):
    serializer_class = CarritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Carrito.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class ItemCarritoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return ItemCarrito.objects.none()
        return ItemCarrito.objects.filter(carrito__usuario=user)

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return ItemCarritoCreateUpdateSerializer
        return ItemCarritoSerializer

    def perform_create(self, serializer):
        carrito, created = Carrito.objects.get_or_create(usuario=self.request.user)
        serializer.save(carrito=carrito)
        
class ItemCarritoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto', 'cantidad']          