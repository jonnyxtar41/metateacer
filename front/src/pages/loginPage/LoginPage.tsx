import React  from 'react';
import LoginForm from '../../layouts/loginForm/LoginForm';
import styles from './LoginPage.module.css'; 
import SignupForm from '../../layouts/loginForm/SignupForm';
import { useState } from 'react';





const LoginPage: React.FC = () => {



    const [activeForm, setActiveForm] = useState<'login' |'singup'>('login')


    const showSignupForm = () => {
        setActiveForm('singup')
        alert('Sign In button clicked!');
    }

    const showLoginFrom = () => {
        setActiveForm('login')
        alert('Login button clicked!');
    }

       
    return (

        
            


        <div className={styles.loginPageContainer}>
            {activeForm === "login" ? (
                <LoginForm onGoToSignup={showSignupForm}/>

            ) : (
                <SignupForm onGoToLogin={showLoginFrom} />
            )

            }

            

        </div>

       


     
      

       
    )
}


export default LoginPage;

export interface LoginFormInputs {
    username: string;
    password: string;
}