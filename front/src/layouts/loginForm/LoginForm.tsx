
import styles from './LoginForm.module.css'
import CampoForm from '../../components/campoForm/CampoForm';
import LoginSignInButtons  from '../../components/btnForm/BtnForm'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthResponse, login} from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';






interface LoginFormProps {
    onGoToSignup: () => void
    
}

type FormFieldsLogin = {
    username: string
    password: string
}


const LoginForm: React.FC<LoginFormProps> = ({ onGoToSignup }) => {

    const navigate = useNavigate()

    const {
        register, // Función para registrar los inputs
        handleSubmit, // Función para manejar el envío del formulario   
        formState: { errors, isSubmitting }, // Estado del formulario (errores, si está enviando, etc.)
        setError,  // Muestra errores del servidor
    } = useForm<FormFieldsLogin>({mode: 'onBlur'}); // 'onBlur' Para validar cuando el campo pierde el foco

    const onSubmit: SubmitHandler<FormFieldsLogin> = async (data) => {

        console.log('Datos del formulario de login:', data);
        try {
            const response: AuthResponse = await login(data)
            alert(`Login exitoso para: ${response.user?.username}. Token: ${response.token}`);

            if (response.token) {
                localStorage.setItem('authToken', response.token);
                console.log('Token almacenado en localStorage: ', response.token)
                navigate('/')
            }
        
        } catch (error: any) {
            console.error('Error en el login desde el componente:', error);

            const errorMessage = error?.message || 'Ocurrió un error desconocido durante el login.';
            alert(`Error de login: ${errorMessage}`);
            
            // Usamos setError de react-hook-form para mostrar un error general del formulario
            setError('root.serverError', { type: 'custom', message: errorMessage }); // 'root.serverError' es un nombre que elegimos
        }
     
    }
        


    return (
       

        <form className={styles.loginBox}  onSubmit={handleSubmit(onSubmit)}> 

            <h1>Login</h1> 

            {/* Mostrar el error general del servidor si existe */}
            {errors.root?.serverError && (
                <p className={styles.errorMessage}>{errors.root.serverError.message}</p>
            )}

            <CampoForm 
                label="USUARIO"
                id="loginFormUsername"
                type="text" 
                {...register('username',{
                    required: 'El nombre de usuario es obligatorio'})} // El operador '...' esparce las props necesarias (name, onChange, onBlur, ref)
                autoComplete="username"
            />
            {errors.username && <p className={styles.errorMessage}>{errors.username.message} </p> }


            <CampoForm 
                label="CONTRASEÑA"
                id="loginFormPassword"
                type="password" 
                {...register('password',{
                    required: 'La contraseña es obligatoria',
                    minLength: {
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres'
                    },

                
                })}
                autoComplete="current-password"
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password.message} </p> }


            <div className={styles.linksContainer}>
                <a href="/forgot-password" className={styles.link}>
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            <LoginSignInButtons 
                loginType='submit'
                loginDisabled={isSubmitting} 
                onSignInClick={onGoToSignup} />

                    
        </form>

    )
}


export default LoginForm