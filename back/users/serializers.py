# back/users/serializers.py
from rest_framework import serializers
from .models import CustomUser




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser # Le decimos a 
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'role', 'date_joined']   
        extra_kwargs = {
            # 'password' también debe ser de solo escritura.
            'password': {'write_only': True, 'style': {'input_type': 'password'}}
        }


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'password2', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }# 'write_only=True' significa que este campo se usará para la entrada (creación/actualización)
        # pero no se mostrará en la salida (respuesta de la API).


    def validate(self, attrs):
        # Esta función se llama para validar los datos que llegan.
        # 'attrs' es un diccionario con los datos del formulario/JSON.
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        # Aquí podrías añadir más validaciones, como la complejidad de la contraseña
        # - Validar la complejidad de la contraseña
        return attrs

    def create(self, validated_data):
        # Esta función se llama cuando .save() es invocado en el serializer
        # y estamos creando un nuevo objeto (no actualizando uno existente).
        # Removemos 'password2' porque no es un campo de nuestro modelo CustomUser.
        
        validated_data.pop('password2') # No queremos guardar password2 en el modelo
        user = CustomUser.objects.create_user(**validated_data)
        # create_user ya se encarga de hashear la contraseña
        return user
    
