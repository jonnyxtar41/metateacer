import React, { useEffect, useState } from 'react';
import Header from '../../layouts/header/Header';
import{TopAppBar2} from '../../layouts/header/Topbar'
import HeroBanner from '../../layouts/heroBanner/HeroBanner';
import CardLink from '../../components/cardLink/CardLink';
import { getUsers, ReqeResUser} from '../../services/ApiService';






const Homepage: React.FC = () => {

    const [users, setUsers] = useState<ReqeResUser[]>([])
    const [isLoading, setIsLoading ] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                setIsLoading(true)
                setError(null)
                const response = await getUsers(1)
                setUsers(response.data)
            } catch(err) {
                setError("Hubo un error al cargar los usuarios")
                console.error(err)

            } finally {
                setIsLoading(false)
            }  
        }

        fetchUsers()
    }, []  )  // Con el array de dependencias Vacio, solo se va a ejecutar una vez

    

 




    return (

        <div>
            <Header />
            <TopAppBar2 />
            <HeroBanner />

             {/* Tus CardLink existentes */}
            <CardLink title='Planes de Estudio' description='Explora nuestros planes de estudio interactivos.' iconUrl='/path/to/icon.svg' linkTo='/study-plans' />
            <CardLink title='Actividades Lúdicas' description='Aprende jugando con nuestras actividades.' iconUrl='/path/to/another-icon.svg' linkTo='/activities' />



            {/* INICIO DE NUEVA SECCIÓN PARA MOSTRAR USUARIOS */}
            <div style={{ padding: '20px', marginTop: '30px', borderTop: '1px solid #eee' }}>
                <h2>Usuarios de Prueba (de ReqRes.in)</h2>
                {isLoading && <p>Cargando usuarios...</p>}
                {error && <p>{error}</p>}   
                {!isLoading && !error && users.length > 0 && (
                    <ul style={{listStyle: 'none', padding: '0'}}>
                        {users.map(user => (
                            <li key={user.id}>  
                                <img></img>
                                <div>
                                    <strong>{user.fisrtName} {user.lastName}</strong> <br />
                                    {user.email}
                                </div>

                            </li>
                        )

                        )
                        }
                        


                    </ul>
                )}
                     {!isLoading && !error && users.length === 0 && (
                <p>No se encontraron usuarios.</p>
            )}

            </div>

            {/*  FIN DE NUEVA SECCIÓN PARA MOSTRAR USUARIOS */}



        </div>



     
      

       
    )
}


export default Homepage;