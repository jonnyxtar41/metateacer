import axios from "axios";



// Configuración base de Axios para reqres.in

const apiClient = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
    }
})

// Definimos una interfaz para los datos de usuario que esperamos de reqres.in. 

export interface ReqeResUser {
    id: number
    email: string
    fisrtName: string
    lastName: string
    avatart : string
}


// Definimos una interfaz para la respuesta completa cuando pedimos una lista de usuarios
export interface GetUsersResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: ReqeResUser[]    // Aquí le decimos que 'data' será un array de nuestros 'ReqResUser'
    support: {
        url: string
        text: string
    }
}



// Función para obtener una lista de usuarios

export const getUsers = async (page:number): Promise<GetUsersResponse> => {
    try{
        const response = await apiClient.get<GetUsersResponse>(`/users?page=${page}`)
        return response.data


    } catch (error) {
        console.error('Error fetching users:', error)
        throw error

    }

}