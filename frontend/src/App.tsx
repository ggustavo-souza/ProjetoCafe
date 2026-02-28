import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'; // importando os icones do bootstrap;
import './assets/css/main.css'; // importando o css main pro tailwind;
import Entrada from './views/Entrada'
import HomeAdmin from './views/admin/HomeAdmin';
import HomeUsuario from './views/user/HomeUsuario';
import AuthAcess from './services/useAuth';
import AuthAcessUser from './services/useAuthUser';
import CardapioAdmin from './views/admin/CardapioAdmin';
import CardapioAdicionar from './views/admin/cardapio/CardapioAdicionar';
import CardapioEditar from './views/admin/cardapio/CardapioEditar';
import CardapioExcluir from './views/admin/cardapio/CardapioExcluir';

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
          <Route path='/admin/cardapio/adicionar' element={
            <AuthAcess>
              <CardapioAdicionar />
            </AuthAcess>
          } />
          <Route path='/admin/cardapio/editar/:id' element={
            <AuthAcess>
              <CardapioEditar />
            </AuthAcess>
          } />
          <Route path='/admin/cardapio/excluir/:id' element={
            <AuthAcess>
              <CardapioExcluir />
            </AuthAcess>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
