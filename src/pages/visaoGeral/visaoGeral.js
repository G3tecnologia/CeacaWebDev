import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { MdDashboard } from "react-icons/md";
import Cards from "../../components/cards";
import NavBar from "../../components/navBar";
import Title from "../../components/title";

export default function VisaoGeral() {
  const [totalRecebido, setTotalRecebido] = useState("R$ 0,00");
  const [totalPendente, setTotalPendente] = useState("R$ 0,00");
  const [valores, setValores] = useState(["R$ 5000", "R$ 2000"]);

  const [cpf_cnpj, setcpf_cnpj] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const nomes = ["Pagos", "Pendentes"];
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3002/api/parcelas_receber")
      .then((response) => response.json())
      .then((data) => {
        const valorRecebidoFormatado = parseFloat(
          data.total_a_receber
        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        setTotalRecebido(valorRecebidoFormatado);
      })
      .catch((error) =>
        console.error("Erro ao buscar dados recebidos:", error)
      );

    fetch("http://localhost:3002/api/contas_receber/total")
      .then((response) => response.json())
      .then((data) => {
        const valorPendenteFormatado = parseFloat(
          data.total_a_receber
        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        setTotalPendente(valorPendenteFormatado);
        setValores(["R$ 5000", valorPendenteFormatado, "R$ 2000"]);
      })
      .catch((error) =>
        console.error("Erro ao buscar dados pendentes:", error)
      );
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = {
      labels: nomes,
      datasets: [
        {
          data: valores.map((val) =>
            parseFloat(
              val.replace("R$ ", "").replace(".", "").replace(",", ".")
            )
          ),
          backgroundColor: ["#12A405", "#D25903", "#D25903"],
          hoverBackgroundColor: ["#69DE5E", "#EA4F4F", "#D3722E"],
        },
      ],
    };

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: data,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [valores]);

  const handleSalvar = () => {
    console.log("Dados salvos:", { cpf_cnpj, oldPassword, newPassword });
  };

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Visão Geral">
          <MdDashboard size={25} color="#004410" />
          cpfCnpj={cpf_cnpj}
          oldPassword={oldPassword}
          newPassword={newPassword}
          onNovaSenhaChange={(e) => setoldPassword(e.target.value)}
          onSalvar={handleSalvar}
        </Title>

        <Cards
          nomes={nomes}
          valores={[totalRecebido, totalPendente]}
          informacoes={[
            "Recebido até hoje",
            "Boletos em aberto",
            "Pagamentos futuros",
          ]}
        />

        <div
          className="grafico"
          style={{ width: "28%", marginTop: "90px", marginLeft: "450px" }}
        >
          <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
}
