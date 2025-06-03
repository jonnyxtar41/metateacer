
import axios from 'axios';



export interface AuthCredentials {
    username:string
    password:string
}


export interface UserData {
    id: string
    username: string
    token: string // Un token JWT simulado
    email?: string; 
}

export interface AuthResponse {
    success: boolean
    message?: string
        user?: { // Ajustamos la interfaz user para que sea más genérica
        id?: string; // Podría ser el ID de Django
        username: string;   
        email?: string;
    };
    token?: string
}

export interface RegisterResponse extends AuthResponse {
    // mail: string

}

const API_BASE_URL = 'http://localhost:8000/api'


const NETWORK_DELAY =1000 // Se puede eliminar para la función login conectada



/**
 * Realiza una llamada de login al API del backend.
 * @param credentials - Las credenciales del usuario (username, password).
 * @returns Una promesa que resuelve a AuthResponse.
 */
export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {

    try {
        const response = await  axios.post<{ token: string} >(`${API_BASE_URL}/auth/token/`, {
            username: credentials.username,
            password: credentials.password
        })

        // Si la petición es exitosa (status 200-299), DRF devuelve el token
        if (response.data.token) {
            console.log(`[AuthService] Login exitoso para ${credentials.username}. Token recibido`)
            return {
                success: true,
                token: response.data.token,
                user: {
                    username: credentials.username, // Asumimos que el username es el mismo que se envió
                    // podrías intentar decodificar el token si es JWT y contiene datos del usuario,
                    // o hacer otra llamada a /api/users/me/ (un endpoint que tendríamos que crear)
                },
                message: "Login exitoso",

            }
        } else {
            console.error('[AuthService] Token no recibido del backend, aunque la petición fue exitosa.');
            throw new Error('Token no recibido del backend.');
        }
    } catch (error: any) {
        console.error('[AuthService] Error en el login:', error.response?.data || error.message);
        let errorMessage = 'Error de conexión o del servidor. Intenta más tarde.';
        if (axios.isAxiosError(error) && error.response) {
            // DRF para obtain_auth_token con credenciales incorrectas devuelve un 400
            // con un cuerpo como: { "non_field_errors": ["Unable to log in with provided credentials."] }
            if (error.response.data?.non_field_errors && Array.isArray(error.response.data.non_field_errors)) { 
                errorMessage = error.response.data.non_field_errors.join(' ');
            } else if (error.response.data?.detail) { // A veces DRF usa 'detail' para errores
                errorMessage = error.response.data.detail;
            } else if (typeof error.response.data === 'object' && Object.keys(error.response.data).length > 0) {
                // Si hay otros errores de validación específicos de campos (aunque no para obtain_auth_token típicamente)
                // podríamos intentar formatearlos, pero para login usualmente es un error general.
                const fieldErrors = Object.values(error.response.data).flat().join(' ');
                if (fieldErrors) errorMessage = fieldErrors;
            }

        }
              // Devolvemos una promesa rechazada para que el .catch() en el componente LoginForm se active
        return Promise.reject({
            success: false,
            message: errorMessage,
        });
    }


}

    
           







export interface SignupCredentials extends AuthCredentials {
    email: string;
    first_name?: string; // Opcional, pero tu UserRegistrationSerializer lo espera
    last_name?: string;  // Opcional
    // role?: string;    // Tu serializer tiene 'role', pero no está en tu SignupForm.tsx.
                         // Si quieres que el usuario elija rol al registrarse, hay que añadirlo al form.
                         // Por defecto, tu modelo CustomUser lo pone como 'student'.
}


// La función signup original de tu AuthService.ts mockeada
export const signup = (credentials: SignupCredentials): Promise<RegisterResponse> => {
    console.warn('[AuthService] La función signup aún está mockeada y no conectada al backend.');
    // Aquí iría la lógica para llamar a tu endpoint POST /api/users/ en Django
    // usando axios.post(`${API_BASE_URL}/users/`, credentials)
    // y manejando la respuesta y errores de forma similar a login.

    // Por ahora, mantenemos la simulación:
    const mockUsersUsernames = ["Jondam", "kathy", "testuser", "admin"]; // Simula usuarios existentes

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mockUsersUsernames.includes(credentials.username)) {
                console.error(`[AuthService Mock] Registro fallido: el usuario ${credentials.username} ya existe.`);
                reject({
                    success: false,
                    message: `El nombre de usuario "${credentials.username}" ya está en uso.`,
                });
            } else {
                const newUser: UserData = { // Usamos UserData para consistencia, aunque el token no se usa aquí
                    id: String(Date.now()), // ID simple
                    username: credentials.username,
                    email: credentials.email,
                    token: `fake-jwt-token-${credentials.username}`, // Token simulado, aunque el registro real no devuelve token
                };
                console.log(`[AuthService Mock] Registro exitoso para ${credentials.username}`);
                resolve({
                    success: true,
                    user: { username: newUser.username, email: newUser.email, id: newUser.id },
                    message: '¡Registro exitoso! Ahora puedes iniciar sesión.',
                    // 'mail' no está en RegisterResponse, 'email' está en 'user' o en SignupCredentials
                });
            }
        }, NETWORK_DELAY);
    });
};