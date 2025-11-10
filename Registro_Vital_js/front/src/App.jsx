import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import Index from './pages/index.jsx';
import Cadastro from './pages/pages_cliente/cadastro.jsx';
import CriarConta from './pages/pages_cliente/criar.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/criar" element={<CriarConta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
