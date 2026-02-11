import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/css/main.css'; // importando o css main pro tailwind;
import Entrada from './views/Entrada'
import HomeAdmin from './views/admin/HomeAdmin';
import HomeCliente from './views/user/HomeCliente';
import AuthAcess from './services/useAuth';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Entrada />} />
          <Route path="/cliente" element={<HomeCliente />} />
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
