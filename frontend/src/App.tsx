import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/css/main.css'; // importando o css main pro tailwind;
import Entrada from './views/Entrada'
import HomeAdmin from './views/admin/HomeAdmin';
import HomeCliente from './views/user/HomeCliente';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Entrada />} />
          <Route path="/cliente" element={<HomeCliente/>} />
          <Route path="/admin" element={<HomeAdmin/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
