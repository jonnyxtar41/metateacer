import React from 'react';



    const HeroImage: React.FC= () => {

        const fixedImageUrl = 'https://previews.123rf.com/images/hironicons/hironicons2304/hironicons230400468/202211283-personaje-de-dibujos-animados-de-tres-ni%C3%B1os-peque%C3%B1os-que-van-a-la-escuela-una-ilustraci%C3%B3n-creada-con.jpg'; 
        const overlayGradient = 'linear-gradient(135deg, rgba(0, 41, 90, 0.1) 0%, rgba(0, 41, 90, 0.34) 25%, rgba(0, 40, 90, 0.8) 75%, rgba(3, 35, 73, 0.89) 80%, rgba(0, 1, 3, 0.9) 100%)';

        const divStyle: React.CSSProperties = {
            backgroundImage: `${overlayGradient}, url(${fixedImageUrl})`,
            width: '100%', // Por ejemplo: ancho siempre al 100% del contenedor padre
            height: '100%',
            backgroundSize: 'cover', // Hace que la imagen cubra el área del div, recortando si es necesario
            backgroundPosition: 'center', // Centra la imagen en el div
            backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        }

        return (
            <div 
                style={divStyle}
            ></div>
        )


    }


    export default HeroImage


        // *** AQUÍ es donde cambias la posición del fondo ***
    // backgroundPosition: 'center', // El valor anterior (centrado)
    // backgroundPosition: 'top left', // Ejemplo: Esquina superior izquierda
    // backgroundPosition: 'bottom right', // Ejemplo: Esquina inferior derecha
    // backgroundPosition: '25% 75%', // Ejemplo: Alinea el punto (25%, 75%) de la imagen con el punto (25%, 75%) del contenedor