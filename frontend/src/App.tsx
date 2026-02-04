import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/css/main.css'; // importando o css main pro tailwind;
import Entrada from './views/Entrada'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Entrada />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
