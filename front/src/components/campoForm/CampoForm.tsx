import React, { useState, InputHTMLAttributes } from 'react';
import styles from './CampoFrom.module.css'




interface CampoFormProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    id: string
    type: string
}



const CampoForm: React.FC<CampoFormProps> = ({label, id, type, ...rest}) => {

    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };




    return (

        <div className={styles.divCampo}>   

        
            <input  className={styles.formInput}
                    id={id}
                    type={inputType}
                    {...rest}
                    ></input>
            <label  htmlFor={id} 
                    className={styles.formLabel}
                    >{label}</label>

            {type === 'password' && (
                
                <div className={styles.passwordIconContainer}
                    onClick={togglePasswordVisibility}
                    // Accesibilidad: añadir rol y aria-label
                    role="button"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    {showPassword ? (
                        <span className={styles.icon}>👁️</span> // Ejemplo con emoji
                    ) : (
                         <span className={styles.icon}>🙈</span> // Ejemplo con emoji
                    )}
                </div>
            )}
                    
        </div>

    )
}


export default CampoForm