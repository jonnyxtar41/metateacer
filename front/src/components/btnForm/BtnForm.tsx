import React from 'react';
import styles from'./BtnForm.module.css'; // Import the CSS file

interface LoginSignInButtonsProps {
  onLoginClick?: () => void;
  onSignInClick?: () => void;
  loginDisabled?: boolean; // Para deshabilitar el botón
  signupDisabled?: boolean;
  loginType?: 'button' | 'submit' | 'reset' 
  signupType?: 'button' | 'submit' | 'reset' 
}

const LoginSignInButtons: React.FC<LoginSignInButtonsProps> = ({ 
    onLoginClick, onSignInClick, 
    loginDisabled, signupDisabled,
    loginType = 'button',  // <--- Valor por defecto para loginType
    signupType = 'button' // <--- Valor por defecto para signupType
}) => {
    const loginButton = `${styles.button} ${styles.loginButton}`;
    const signinButton = `${styles.button} ${styles.signinButton}`;


    return (
        <div className={styles.buttonContainer}>

            <button 
                type={loginType}
                className={loginButton} 
                onClick={onLoginClick}
                disabled={loginDisabled} // Para deshabilitar durante el envío
            >
                Login
            </button>


            <button 
                type={signupType}
                className={signinButton}
                onClick={onSignInClick}
                disabled={signupDisabled} 
            >
                Sign In
            </button>
        </div>
    );
};

export default LoginSignInButtons;