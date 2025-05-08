import { Route, Routes } from "react-router-dom";

import Boletos from "../pages/boletos";
import Listagem from "../pages/listagem";
import VisaoGearl from "../pages/visaoGeral";

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<VisaoGearl/>} />
            <Route path="/visaoGeral" element={<VisaoGearl/>} />
            <Route path="/boletos" element={<Boletos/>} />
            <Route path="/listagem" element={<Listagem/>} />
        </Routes>
    )
}