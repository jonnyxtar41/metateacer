import React from "react";
import styles from './HeroCard.module.css'



const HeroCard: React.FC = ()  => {
    return (
        <div className={styles.heroCard}>
            <h2 className={styles.cardTitle}>Diviertete mientas aprendes</h2>
            <p className={styles.cardSubtitle}>Prueba tu suerte y habilidad con nuestros mini juegos</p>
            <button className={styles.cardBoton}>!Explora más¡</button>
        </div>
    )
}

export default HeroCard