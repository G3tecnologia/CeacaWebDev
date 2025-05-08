import { useEffect, useRef } from "react";
import { MdDashboard } from "react-icons/md";
import Cards from "../../components/cards";
import NavBar from "../../components/navBar";
import Title from "../../components/title";

import { Chart } from "chart.js/auto"; //

export default function VisaoGearl() {
  const nomes = ["Pagos", "Pendentes", "Baixados"];
  const valores = ["R$ 5000", "R$ 1000", "R$ 2000"];

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = {
      labels: nomes,
      datasets: [
        {
          data: valores.map((val) =>
            parseFloat(val.replace("R$ ", "").replace(",", "."))
          ),
          backgroundColor: ["#12A405", "#F61717", "#D25903"],
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
  }, [nomes, valores]);

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Visão Geral">
          <MdDashboard size={25} />
        </Title>

        <Cards
          nomes={nomes}
          valores={valores}
          informacoes={[
            "Recebido até hoje",
            "Boletos em aberto",
            "Pagamentos futuros",
          ]}
        />

        {/* Gráfico de pizza com canvas */}
        <div
          className="grafico"
          style={{ width: "25%", marginTop: "90px", marginLeft: "150px" }}
        >
          <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
}
