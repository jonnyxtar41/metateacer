
import React from "react"
import styles from './BtnLogin.module.css'



interface BtnLoginProps {
    tipoBoton: string
    onClick?: () => void
    text: string
    //href: string
}

const BtnLogin: React.FC<BtnLoginProps> = ({ tipoBoton , onClick, text }) => {

    const specificStyleClass  = tipoBoton === "signin" ? styles.primary : styles.active;
    const styleBoton = tipoBoton === "signin" ? styles.btnSingin : styles.btnLogin;
    

    const combinedClassName = `${styleBoton} ${specificStyleClass}`

    return (
        <button
            onClick={onClick}   
            className={combinedClassName}    
        
        
        >{text}</button>
    )

}

export default BtnLogin