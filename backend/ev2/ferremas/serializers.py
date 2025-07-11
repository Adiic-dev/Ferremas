from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Producto, PrecioProducto, Carrito, ItemCarrito

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            "username", "email", "first_name", "last_name",
            "password", "rut", "celular", "genero"
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def create(self, validated_data):
        user_model = get_user_model()
        password = validated_data.pop('password')
        user = user_model(**validated_data)
        user.set_password(password)
        user.save()
        return user


class PrecioProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecioProducto
        fields = ['id', 'fecha', 'valor']


class ProductoSerializer(serializers.ModelSerializer):
    precios = PrecioProductoSerializer(many=True, read_only=True)
    precio_inicial = serializers.DecimalField(write_only=True, max_digits=10, decimal_places=2)

    class Meta:
        model = Producto
        fields = ['id', 'codigo_producto', 'codigo', 'nombre', 'marca', 'precios', 'precio_inicial']
        read_only_fields = ['codigo_producto', 'codigo']

    def create(self, validated_data):
        precio_inicial = validated_data.pop('precio_inicial')
        producto = Producto.objects.create(**validated_data)
        PrecioProducto.objects.create(producto=producto, valor=precio_inicial)
        return producto


class ItemCarritoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True
    )

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto', 'producto_id', 'cantidad']


class CarritoSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Carrito
        fields = ['id', 'usuario', 'creado_en', 'items', 'total']

    def get_total(self, obj):
        return sum(item.subtotal() for item in obj.items.all())


class ItemCarritoCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto', 'cantidad']
