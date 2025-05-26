import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/Homepage';
import LoginPage from './pages/loginPage/LoginPage'
import Header from './layouts/header/Header';


function App() {
 

  return (

    <BrowserRouter>
      {/* El Header se mostrará en todas las páginas definidas aquí si está fuera de <Routes>
          o puedes usar un componente Layout para envolver rutas específicas.
          Por ahora, lo pondremos aquí para simplicidad y asumimos que es global.
      */}
      {/*<Header />*/}

      <main>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />}   />
          </Routes>
      </main>
    
    </BrowserRouter>


   
    
  )
}

export default App
