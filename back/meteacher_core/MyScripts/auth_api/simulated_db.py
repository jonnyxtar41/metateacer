
# ¡IMPORTANTE!: En un entorno real, NUNCA guardes contraseñas en texto plano.
# Siempre deben estar hasheadas. Esto es solo para simulación.
SIMULATED_USERS_DB = {
    "jondam": {
        "password": "password123", # En producción, esto sería un hash
        "email": "jondam@example.com",
        "user_id": "user001",
        "token": "fakeTokenJondam123" # Token simulado
    },
    "kathy": {
        "password": "securepassword", # En producción, esto sería un hash
        "email": "kathy@example.com",
        "user_id": "user002",
        "token": "fakeTokenKathy456" # Token simulado
    },
    "testuser": { # Añadido para coincidir con tu AuthService.ts del frontend
        "password": "password",
        "email": "test@example.com",
        "user_id": "user003",
        "token": "fakeTokenTestUser789"
    },
    "admin": { # Añadido para coincidir con tu AuthService.ts del frontend
        "password": "password",
        "email": "admin@example.com",
        "user_id": "user004",
        "token": "fakeTokenAdmin000"
    }
    # Puedes añadir más usuarios aquí
}