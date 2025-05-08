import { MdDashboard } from "react-icons/md";
import NavBar from "../../components/navBar";
import Title from "../../components/title";
import Cards from "../../components/cards";

export default function VisaoGearl() {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Visão Geral">
          <MdDashboard size={25} />
        </Title>

        <Cards
          nomes={["Recebido", "Pendente", "Agendado"]}
          valores={["R$ 10.000", "R$ 2.500", "R$ 3.000"]}
          informacoes={[
            "Recebido até hoje",
            "Boletos em aberto",
            "Pagamentos futuros",
          ]}
        />


      </div>
    </div>
  );
}
