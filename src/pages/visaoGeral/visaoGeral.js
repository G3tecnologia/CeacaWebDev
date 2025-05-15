import { Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useRef, useState } from "react";
import { MdDashboard } from "react-icons/md";
import Cards from "../../components/cards";
import NavBar from "../../components/navBar";
import Title from "../../components/title";

import "./visaoGeral.css";

Chart.register(ChartDataLabels);

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
    const fetchData = async () => {
      try {
        const [resRecebido, resPendente] = await Promise.all([
          fetch("http://localhost:3002/api/parcelas_receber"),
          fetch("http://localhost:3002/api/contas_receber/total"),
        ]);

        const dataRecebido = await resRecebido.json();
        const dataPendente = await resPendente.json();

        const valorRecebidoFormatado = parseFloat(
          dataRecebido.total_a_receber
        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

        const valorPendenteFormatado = parseFloat(
          dataPendente.total_a_receber
        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

        setTotalPendente(valorPendenteFormatado);
        setTotalRecebido(valorRecebidoFormatado);
        setValores([valorRecebidoFormatado, valorPendenteFormatado]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
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
            parseFloat(val.replace(/[R$\s.]/g, "").replace(",", "."))
          ),
          backgroundColor: ["#12A405", "#E63B3B"],
          hoverBackgroundColor: ["#69DE5E", "#C92828"],
        },
      ],
    };

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: data,
      options: {
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              return data.labels[context.dataIndex];
            },
            color: "#fff",
            font: {
              weight: "bold",
              size: 14,
            },
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              color: "#333",
              font: {
                size: 14,
              },
              usePointStyle: true,
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [valores]);

  const buscarDadosUsuario = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/clientes/update-password"
      );
      const data = await response.json();

      setcpf_cnpj(data.cpf_cnpj);
      setoldPassword(data.oldPassword);
      setnewPassword("");
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  const handleSalvar = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/clientes/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpf_cnpj,
            oldPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        alert("Senha atualizada com sucesso!");
        setoldPassword(newPassword);
        setnewPassword("");
      } else {
        alert("Erro ao atualizar a senha.");
      }
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar os dados.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Visão Geral">
          <MdDashboard size={25} color="#000" />
        </Title>

        <Cards
          nomes={nomes}
          valores={[totalRecebido, totalPendente]}
          informacoes={["Recebido até hoje", "Boletos em aberto"]}
        />

        <div className="grafico">
          <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
}
