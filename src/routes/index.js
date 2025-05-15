import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/privateRoute"; 
import Login from "../pages/login/login";
import Boletos from "../pages/boletos/boletos";
import Listagem from "../pages/listagem/listagem";
import VisaoGeral from "../pages/visaoGeral/visaoGeral";
import Veiculos from "../pages/veiculo/veiculos";
import Cadastro from "../pages/cadastro/cadastro"; 

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    
      <Route 
        path="/visaoGeral" 
        element={<PrivateRoute allowedRoles={["admin", "user"]}><VisaoGeral /></PrivateRoute>}
      />
      <Route 
        path="/boletos" 
        element={<PrivateRoute allowedRoles={["admin", "user"]}><Boletos /></PrivateRoute>}
      />
      <Route 
        path="/listagem" 
        element={<PrivateRoute allowedRoles={["admin", "user"]}><Listagem /></PrivateRoute>}
      />
      <Route 
        path="/veiculos" 
        element={<PrivateRoute allowedRoles={["admin", "user"]}><Veiculos /></PrivateRoute>}
      />
    </Routes>
  );
}
