from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser # Importamos nuestro CustomUser
from django.utils.translation import gettext_lazy as _ # Para textos traducibles

# Register your models here.

class CustomUserAdmin(UserAdmin):
    # Campos que se mostrarán en la lista de usuarios
    list_display = ('email', 'username', 'first_name', 'last_name', 'role', 'is_staff', 'is_active')
    # Campos por los que se podrá filtrar en la barra lateral
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'role')
    # Campos por los que se podrá buscar
    search_fields = ('email', 'username', 'first_name', 'last_name')
    # Orden por defecto en la lista
    ordering = ('email',)


    fieldsets = (
        (None, {'fields': ('email', 'password')}), # Sección sin nombre para email y password
        (_('Información Personal'), {'fields': ('first_name', 'last_name', 'username', 'role')}), # Sección de Info Personal
        (_('Permisos'), { # Sección de Permisos
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Fechas Importantes'), {'fields': ('last_login', 'date_joined')}), # Sección de Fechas
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',), # 'wide' es una clase CSS para que ocupe más espacio
            'fields': ('email', 'username', 'first_name', 'last_name', 'role', 'password', 'password2'),
            # 'password2' es para la confirmación de contraseña que UserAdmin maneja
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)