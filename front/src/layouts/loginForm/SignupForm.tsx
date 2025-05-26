
import styles from './SignupForm.module.css'
import CampoForm from '../../components/campoForm/CampoForm';
import LoginSignInButtons  from '../../components/btnForm/BtnForm'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signup,   AuthResponse } from '../../services/AuthService'; 



interface SignupFormProps {
    onGoToLogin: () => void
}

type FormFieldsSignup = {

    username: string
    email: string
    password: string
    confirmPassword: string

}


const SignupForm: React.FC<SignupFormProps> = ({ onGoToLogin }) => {


    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
        watch,
        setError
    } = useForm<FormFieldsSignup>({
        mode: 'onBlur' // Opcional: para validar cuando el campo pierde el foco
    });

    const passwordValue = watch('password'); // Observa el valor del campo 'password'


   
    

    const onSubmit: SubmitHandler<FormFieldsSignup> = async (data) => {
        console.log('Datos del formulario de signup:', data);
        const { confirmPassword, ...signupData } = data; // Excluimos confirmPassword de los datos a enviar

        try {
            const response: AuthResponse = await signup(signupData);
            console.log('Respuesta del signup mock:', response);
            alert(`¡Registro Exitoso! ${response.message}. Usuario: ${response.user?.username}`)
            onGoToLogin();

        } catch (error: any) {
            console.error('Error en el signup mock:', error);
            const errorMessage = error?.message || 'Ocurrió un error desconocido durante el registro.';
            alert(`Error de registro: ${errorMessage}`);
            setError('root.serverError', { type: 'custom', message: errorMessage });
            // Opcional: si el API devuelve errores específicos por campo:
            // if (error.field === 'username') {
            //   setError('username', { type: 'server', message: error.message });
            // }

        }
        

        await new Promise((resolve) => setTimeout(resolve,1000));
        alert(`Registro con: Usuario: ${data.username}, Correo: ${data.email}`);


    };
    


    return (
       

        <form className={styles.signupBox} onSubmit={handleSubmit(onSubmit)}> 

            <h1>Sign Up</h1> 

            <CampoForm 
                label="USUARIO"
                id="SignupFormUsername"
                type="text" // Pasa la prop type
                {...register('username', {
                    required: 'Este campo es obligatorio'})}
                autoComplete="username"
            />
            {errors.username && <p className={styles.errorMessage}>{errors.username.message} </p> }


            <CampoForm 
                label="CORREO ELECTRÓNICO"
                id="SignupFormemail"
                type="email" // Pasa la prop type
                {...register('email', {
                    required: 'Este campo es obligatorio',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Dirección de correo electrónico inválida'
    }
                  })  }
                autoComplete="email"
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email.message} </p> }



            <CampoForm 
                label="CONTRASEÑA"
                id="signupFormPassword"
                type="password" // Pasa la prop type
                {...register('password', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres'
                    },
                  })}
                autoComplete="new-password"
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password.message} </p> }


            <CampoForm 
                label="C0NFIRMAR CONTRASEÑA"
                id="signupFormConfirmPassword"
                type="password" // Pasa la prop type
                {...register('confirmPassword', {
                    required: 'Este campo es obligatorio',
                    validate: value =>
                        value === passwordValue || 'Las contraseñas no coinciden',
                    minLength: {                        
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                
                  })}
                autoComplete="new-password"
            />
            {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword.message} </p> }




            <LoginSignInButtons 
                onLoginClick={onGoToLogin} 
                signupType="submit" 
                signupDisabled={isSubmitting} 
          />

                    
        </form>

    )
}


export default SignupForm