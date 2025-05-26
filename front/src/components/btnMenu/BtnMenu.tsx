import React from "react";
import styles from "./BtnMenu.module.css";

export interface MenuItem {
    id: string;
    text: string;
    isActive?: boolean; // La '?' significa que esta propiedad es opcional
    onClick?: () => void; // Esta también es opcional
}



interface BtnMenuProps {
    text: string; // El texto es esencial para un botón de menú
    onClick?: () => void;
    isActive?: boolean; // Prop para saber si es el elemento activo
  }
  
  const BtnMenu: React.FC<BtnMenuProps> = ({
    text,
    onClick,
    isActive = false, // Por defecto, no está activo
  }) => {
    // Selecciona el estilo CSS basado en si el botón está activo

    const buttonClass = `${styles.btnMenuBase} ${isActive ? styles.active : styles.primary}`;
  
    return (
      <button className={buttonClass} onClick={onClick}>
        {text}
      </button>
    );
  };
  
  export default BtnMenu;