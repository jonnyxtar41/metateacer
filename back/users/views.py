from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import CustomUser
# Create your views here.
from .serializers import UserSerializer, UserRegistrationSerializer



class UserListCreateView(generics.ListCreateAPIView):
    """
    Vista para listar (GET) y crear (POST) usuarios.
    """
    # queryset: El conjunto de todos los objetos que esta vista puede mostrar.
    # En este caso, todos nuestros usuarios.
    queryset = CustomUser.objects.all()

    # permission_classes: Define quién puede acceder a esta vista.
    # 'AllowAny' significa que no se requiere autenticación. Esto es necesario
    # para que nuevos usuarios puedan registrarse. Más adelante podemos
    # configurar permisos más complejos.
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.request.method =='POST':
            # Si es una petición POST (crear un nuevo usuario),usamos el serializer de registro.
            return UserRegistrationSerializer
        
        # Para cualquier otro caso (como una petición GET para listar), usamos el serializer estándar que no expone la contraseña.
        return UserSerializer
