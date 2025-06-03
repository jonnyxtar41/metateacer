
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


// Interfaz para la respuesta específica que esperamos del endpoint de registro de Django
export interface DjangoUserRegistered {
    id: string; // o string, dependiendo de tu ID de usuario en Django
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
    date_joined: string; // Django devuelve fechas como strings ISO
}

export interface SignupResponse extends AuthResponse { // Extendemos AuthResponse para mantener consistencia
    user?: DjangoUserRegistered; // El usuario devuelto por Django al registrarse
}


// La función signup original de tu AuthService.ts mockeada
export const signup = async (credentials: SignupCredentials & { password2 : string }): Promise<SignupResponse> => {

    const payload = {
        email: credentials.email, 
        username: credentials.username,
        password: credentials.password,
        password2: credentials.password2,
        first_name: credentials.first_name || '',
        last_name: credentials.last_name || '',
     
    }

    try {
        const response = await axios.post<DjangoUserRegistered>(`${API_BASE_URL}/users/`, payload)
        // Si la petición es exitosa (status 201 Created)
        console.log('[AuthService] Registro exitoso:', response.data);
        return {
            success: true,
            message: '¡Registro exitoso! Ahora puedes iniciar sesión.',
            user: response.data, // El usuario creado devuelto por Django

        }

    } catch (error: any) {
        console.error('[AuthService] Error en el registro:', error.response?.data || error.message);
        let errorMessage = 'Ocurrió un error durante el registro.';
        
        if (axios.isAxiosError(error) && error.response && error.response.data) {
            // DRF devuelve errores de validación como un objeto donde las claves son los nombres de los campos
            // Ej: { "username": ["A user with that username already exists."], "email": ["Enter a valid email address."] }
            const errorData = error.response.data;
            const fieldErrors: string[] = [];
            for (const field in errorData) {
                if (Array.isArray(errorData[field])) {
                    fieldErrors.push(`${field}: ${errorData[field].join(' ')}`);
                }
            }
            if (fieldErrors.length > 0) {
                errorMessage = fieldErrors.join('; ');
            } else if (errorData.detail) { // Para errores generales como el de `obtain_auth_token`
                 errorMessage = errorData.detail;
            }
        }
        return Promise.reject({
            success: false,
            message: errorMessage,
        })
    }

    

}