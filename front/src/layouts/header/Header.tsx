import React from 'react';
import { useNavigate } from 'react-router-dom'; // 
import styles from './Header.module.css'
import {TopAppBar } from "./Topbar";
import Logo from '../../components/logo/Logo';
import BtnMenu from '../../components/btnMenu/BtnMenu';
import type {MenuItem} from  '../../components/btnMenu/BtnMenu';
import BtnLogin from '../../components/btnLogin/BtnLogin';

interface HeaderProps {

}



const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate(); // Hook para la navegación

    const menuItems: MenuItem[] = [ // type {MenuItem} from  '../../components/btnMenu/BtnMenu';
        { id: 'resources', text: 'Resources', onClick: () => console.log('Navegar a Resources') },
        { id: 'subjects', text: 'Subjects', onClick: () => console.log('Navegar a Subjects') },
        { id: 'blog', text: 'Blog', onClick: () => console.log('Navegar a Blog') },
        { id: 'activities', text: 'Activities', onClick: () => console.log('Navegar a Activities') },
        { id: 'more', text: 'More', onClick: () => console.log('Navegar a More') },
    ];

    const handleLoginClick = () => {
        navigate('/login'); // Navega a la ruta /login
    };






    return (
    <header className={styles.header}>

        <TopAppBar />

        <div className={styles.topAppBarBelow}>

            <div>
                <Logo  imageUrl={'https://static1.teacherspayteachers.com/tpt-frontend/releases/production/current/792404e66d1d57a3f54f.svg'}/>
            </div>

            <nav>
                {menuItems.map((item) => (
                    <BtnMenu     
                        key = {item.id}
                        text = {item.text}
                        onClick = {item.onClick}

                     />))
                }


                <BtnMenu text={"hola"}/>
            </nav>
            
            <div className={styles.loginDiv}>
                <BtnLogin tipoBoton={"login"}  text="Ingresa" onClick={handleLoginClick}/>
                <BtnLogin tipoBoton={"signin"}  text="Únete"/>
            </div>

        </div>
        
    </header>
    )
}

export default Header