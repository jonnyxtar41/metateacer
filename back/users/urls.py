# back/users/urls.py
from django.urls import path
from .views import UserListCreateView


urlpatterns = [
    # Cuando alguien visite la URL 'users/' (relativa a la URL base de esta app),
    # se llamará a UserListCreateView.
    # .as_view() es necesario para las vistas basadas en clases.
    # 'name' es un nombre opcional pero útil para referenciar esta URL en otras partes de Django.
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
]

