

export interface AuthCredentials {
    username:string
    password:string
}

export interface SignupCredentials extends AuthCredentials {
    email: string

}

export interface UserData {
    id: string
    username: string
    token: string // Un token JWT simulado
}

export interface AuthResponse {
    success: boolean
    message?: string
    user?: UserData
    token?: string
}

export interface RegisterResponse extends AuthResponse {
    mail: string

}

// BASE DE DATOS SIMULADA

const mockusers: UserData[] = [
    {id: '1', username: "Jondam", token:'fake-jwt-token-testuser'},
    {id: '2', username: "kathy", token: 'fake-jwt-token-admin' }
]

const NETWORK_DELAY =1000



/**
 * Simula una llamada de login a un API.
 * @param credentials - Las credenciales del usuario (username, password).
 * @returns Una promesa que resuelve a AuthResponse.
 */


export const login = (credentials: AuthCredentials): Promise<AuthResponse> => {

    return new Promise((resolve, reject) => {
        setTimeout( () => {
            mockusers.find(u => console.log(u , "jajajajaj"))
            const user = mockusers.find(u => u.username === credentials.username )
            // En una implementación real, validarías la contraseña aquí (hasheada, etc.)
            // Por ahora, solo verificamos si el usuario existe.

            if( user && credentials.password === 'password') {
                console.log(`[AuthService Mock] Login exitoso para ${credentials.username}`);
                resolve({
                    success: true,
                    message: "exito",
                    user: {id: user.id, username: user.username, token: user.token },
                    token: user.token
                })
            } else {
                // En una implementación real, guardarías el nuevo usuario.
                // Aquí solo simulamos la creación.
                console.error(`[AuthService Mock] Login fallido para ${credentials.username}`);
                reject({
                    success: false, 
                    message:  'Credenciales inválidas. Intenta con usuario "testuser" o "admin" y contraseña "password".',


                });
            }

        }, NETWORK_DELAY)
    })}
            




export const signup = (credentials: SignupCredentials): Promise<RegisterResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if( mockusers.find(u => u.username === credentials.username)) {
                console.error(`[AuthService Mock] Registro fallido: el usuario ${credentials.username} ya existe.`)
                reject({
                    success: false,
                    message: `El nombre de usuario "${credentials.username}" ya está en uso.`,
                })
            } else {
                const newUser: UserData = {
                    id: String(mockusers.length + 1), // ID simple
                    username: credentials.username,
                    token: `fake-jwt-token-${credentials.username}`, // Nuevo token simulado
                    };
                mockusers.push(newUser);
                console.log(`[AuthService Mock] Registro exitoso para ${credentials.username}`)
                resolve({
          
                    success: true,
                    user: newUser,
                    token: newUser.token,
                    message: '¡Registro exitoso! Ahora puedes iniciar sesión.',
                    mail: credentials.email
                })
            }
        



        }

        , NETWORK_DELAY)
    }

    )

}


