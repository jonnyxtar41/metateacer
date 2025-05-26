import React, {useState}from "react";

import styles from './Topbar.module.css'
import LanguageSelector from "../../components/languageSelector/LanguageSelector";



interface TopAppBarProps {
    color: string
}


export const TopAppBar: React.FC = () => {

    const Languages = [
        {code: 'en', name: 'English'},
        {code: 'es', name: 'Español'}
    ]

    const [currentLanguage, setCurrentLanguage] = useState<string>('es')

    const handleLanguageChange = (languageCode:string) => {
        setCurrentLanguage(languageCode)
        console.log('Idioma cambiado a:', languageCode)

    }

    return (




        <div className={styles.topBar}>  

            <LanguageSelector 
                languages={Languages}
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange} />     
            <div>
                <p>Un forma divertida de aprender</p>
            </div>
            <div>
                <p>social networs</p>
            </div>


        </div>
    )
}


export const TopAppBar2: React.FC = () => {
    return (
        <div className={styles.topBar}>  

            <div>
                <p>Un forma divertida de aprender</p>
            </div>

        </div>
    )
}




