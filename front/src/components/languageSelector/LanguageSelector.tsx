import React, { useState, useEffect, useRef } from 'react';
import styles from './LanguageSelector.module.css'; 


interface Languages {
    code: string;
    name: string;
}

interface LanguageSelectorProps {
    languages: Languages[]
    currentLanguage: string
    onLanguageChange: (languageCode: string) => void 
}



const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, currentLanguage, onLanguageChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null); // Ref para el div contenedor

    const handleLanguageSelected = (languageCode: string) => {
        onLanguageChange(languageCode);
        setIsOpen(false);
    }

    const currentLanguageName =
        languages.find((lang) => lang.code === currentLanguage)?.name || currentLanguage;

    // Hook para cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        // Añadir el event listener cuando el componente se monta
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Remover el event listener cuando el componente se desmonta
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]); // El efecto depende de wrapperRef

    return (
        // Añadimos un div contenedor con una referencia (ref) y una nueva clase CSS
        <div className={styles.languageSelectorWrapper} ref={wrapperRef}>
            <div className={styles.languageSelector} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.select}>{currentLanguageName}</span>
                <span>🌍</span>
            </div>
            {isOpen && (
                <div className={styles.languageListContainer}>
                    <ul className={styles.languageList}>
                        {languages.map(lang => (
                            <li className={styles.languageItem}
                                key={lang.code}
                                onClick={() => handleLanguageSelected(lang.code)}
                            >{lang.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;