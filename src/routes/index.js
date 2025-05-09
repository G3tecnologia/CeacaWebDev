import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";
import Boletos from "../pages/boletos/boletos";
import Listagem from "../pages/listagem/listagem";
import VisaoGeral from "../pages/visaoGeral/visaoGeral";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/visaoGeral" element={<VisaoGeral />} />
      <Route path="/boletos" element={<Boletos />} />
      <Route path="/listagem" element={<Listagem />} />
    </Routes>
  );
}
