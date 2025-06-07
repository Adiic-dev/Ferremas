from rest_framework.permissions import BasePermission

class IsRolAdmin(BasePermission):
    """
    Permite acceso sólo a usuarios con rol 'admin'
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.rol == 'admin'
        )
