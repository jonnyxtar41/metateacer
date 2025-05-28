# back/users/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _ # Herramienta para textos multi-idioma


class CustomUserManager(BaseUserManager):
    """
    Manager personalizado para  CustomUser.
    """
    def create_user(self, email, username, password=None, **extra_fields):
        if not email: raise ValueError(_('El campo Email es obligatorio'))
        if not username: raise ValueError(_('El campo Nombre de usuario es obligatorio'))

        email = self.normalize_email(email)
        user = self.model(email=email, username= username, **extra_fields)
        user.set_password(password) # Hashea la contraseña
        user.save(using=self._db)
    
        return user
    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active',True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser debe tener is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser debe tener is_superuser=True.'))
        
        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Modelo de Usuario Personalizado para nuestra plataforma.
    Utiliza email como el identificador principal en lugar de username.
    """
    # --- Roles ---
    ROLE_STUDENT = 'student'
    ROLE_TEACHER = 'teacher'
    ROLE_ADMINISTRATOR = 'administrator'

    ROLE_CHOICES = [
        (ROLE_STUDENT, _('Estudiante')),
        (ROLE_TEACHER, _('Profesor')),
        (ROLE_ADMINISTRATOR, _('Administrador de Plataforma'))
    ]

    # --- Campos de la tabla Usuario ---

    email = models.EmailField(
        -('dirección de correo electronico'),
        unique= True,  # Asegura que no haya dos usuarios con el mismo email
        help_text=_('Requerido. Dirección de correo electrónico única.')
    )
    username = models.CharField(
        _('Nombre de usuario'),
        max_length= 150,
        unique= True, 
        help_text= _('Requerido. 150 caracteres o menos. Letras, dígitos y @/./+/-/_ solamente.')
    )
    first_name = models.CharField(_('nombres'), max_length= 150, blank= True)
    last_name = models.CharField(_('apellidos'), max_length= 150, blank= True)

    role = models.CharField(
        _('rol'),
        max_length=20,
        choices=ROLE_CHOICES,
        default=ROLE_STUDENT,
        help_text=_('El rol que el usuario tendrá en la plataforma.')
    )

    is_staff = models.BooleanField(
        _('es staff'),
        default= False, 
        help_text= _('Designa si el usuario puede iniciar sesión en el sitio de administración de Django.')
    )

    is_active = models.BooleanField(
        _('está activo'),
        default= True, 
        help_text= _(
            'Designa si este usuario debe ser tratado como activo. '
            'Desmarca esto en lugar de borrar cuentas.')
    )
    date_joined = models.DateTimeField(
        _('Fecha de registro'),
        default= timezone.now # Establece la fecha y hora actual al crear el usuario
    )

    # --- Configuración del Modelo ---

    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name'] # Campos adicionales requeridos al crear un superusuario
    
    class Meta:
        verbose_name = _('usuario')
        verbose_name_plural = _('usuarios')
        ordering = ['email']

    def __str__(self):
        """Retorna la representación en string del modelo (usado en el Admin)."""
        return  self.email
    
    def get_full_name(self):
        """
        Retorna el first_name más el last_name, con un espacio en medio.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()  # .strip() quita espacios extra al inicio o final
    
    def get_short_name(self):
        """
        Retorna el nombre corto para el usuario (usualmente el first_name).
        """
        return self.first_name
    

    # Métodos para verificar roles fácilmente
    def is_student(self):
        return self.role == self.ROLE_STUDENT
    
    def is_teacher(self):
        return self.role == self.ROLE_TEACHER
    
    def is_platform_administrator(self):
        return self.role == self.ROLE_ADMINISTRATOR