import React from 'react';
import styles from './Logo.module.css'


interface LogoProps {
    imageUrl?: string
    altText?: string
    linkTo?: string
}

const Logo: React.FC<LogoProps> = ({imageUrl = "/", altText = "hola", linkTo ="/"}) => {

    const logoImage = <img src={imageUrl} alt={altText} className={styles.logoImage}/>

    if (linkTo) {
        return (
            <a 
                style={{
                        //: 'rgba(255, 0, 0, 0.3)', // Ejemplo: rojo semitransparente
                        display: 'flex',
                }}

                href= {linkTo} className={styles.logoLink}>
                {logoImage}
            
            
         
            </a>

        )
    }
    return logoImage

}


export default Logo


// // --- AÑADE ESTO para centrar el contenido (la imagen) ---
// display: 'flex',         // 1. Convierte el <a> en un contenedor flex
// justifyContent: 'center',// 2. Centra el contenido horizontalmente
// alignItems: 'center',    // 3. Centra el contenido verticalmente