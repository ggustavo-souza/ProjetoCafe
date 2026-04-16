import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'; // importando os icones do bootstrap;
import './assets/css/main.css'; // importando o css main pro tailwind;
import Entrada from './views/Entrada'
import HomeAdmin from './views/admin/HomeAdmin';
import HomeUsuario from './views/user/HomeUsuario';
import AuthAcess from './hooks/useAuth';
import AuthAcessUser from './hooks/useAuthUser';
import CardapioAdmin from './views/admin/CardapioAdmin';
import PedidosAdmin from './views/admin/PedidosAdmin';

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
          <Route path='/admin/cardapio' element={
            <AuthAcess>
              <CardapioAdmin />
            </AuthAcess>
          } />
          <Route path='/admin/pedidos' element={
            <AuthAcess>
              <PedidosAdmin />
            </AuthAcess>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
