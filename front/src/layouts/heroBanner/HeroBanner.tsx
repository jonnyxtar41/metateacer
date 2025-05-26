import React from 'react';
import HeroImage from './HeroImage';
import styles from './HeroBanner.module.css'
import HeroCard from './HeroCard';




const HeroBanner: React.FC = ()  => {


    return (

        <div className={styles.heroBanner}>

            <div className={styles.divPattern}></div>


            <div className={styles.heroImage}>
                <HeroImage />
            </div>

            
            <div className={styles.heroCard}>
                <HeroCard />
            </div>

            
        </div>


    )


}



export default HeroBanner



















// https://codepen.io/IevaOzolite/pen/OoEJbb

//https://codepen.io/thefourthlink/pen/gwoger

//https://codepen.io/nathan-sr/pen/qBQqVwr

// https://codepen.io/syahrizaldev/pen/QWmdGwe

// https://codepen.io/bdthemes/pen/powEgeG  :D


