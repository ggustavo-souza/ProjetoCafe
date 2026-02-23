import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/css/main.css'; // importando o css main pro tailwind;
import Entrada from './views/Entrada'
import HomeAdmin from './views/admin/HomeAdmin';
import HomeUsuario from './views/user/HomeUsuario';
import AuthAcess from './services/useAuth';
import AuthAcessUser from './services/useAuthUser';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Entrada />} />
          <Route path="/usuario" element={
            <AuthAcessUser>
              <HomeUsuario />
            </AuthAcessUser>
          } />
          <Route path="/admin" element={
            <AuthAcess>
              <HomeAdmin />
            </AuthAcess>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
