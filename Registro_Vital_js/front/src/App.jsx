import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import Index from './pages/index.jsx';
import Entrar from './components/entrar.jsx';
import Cadastrar from './components/cadastrar.jsx';
import FichaMedicaForm from './pages/pages_cliente/ficha_medica/ficha_medica.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Entrar />} />
        <Route path="/criar" element={<Cadastrar />} />
        <Route path="/ficha-medica" element={<FichaMedicaForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
