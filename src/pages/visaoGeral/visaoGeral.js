import { useEffect, useRef, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import Cards from "../../components/cards";
import NavBar from "../../components/navBar";
import Title from "../../components/title";
import { Chart } from "chart.js/auto"; //

export default function VisaoGeral() {
  const [showPopup, setShowPopup] = useState(false);

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

        
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={() => setShowPopup(!showPopup)}
        >
          <FaUserCircle size={30} color="#333" />
          <FaChevronDown size={20} color="#333" />
        </div>

        
        {showPopup && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "20px",
              background: "#fff",
              padding: "15px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              width: "200px",
            }}
          >
            <h4>Editar Perfil</h4>
            <label>
              Nome:
              <input type="text" placeholder="Nome do usuário" />
            </label>
            <br />
            <label>
              Email:
              <input type="email" placeholder="email@exemplo.com" />
            </label>
            <br />
            <label>
              Senha:
              <input type="password" placeholder="Nova senha" />
            </label>
            <br />
            <button onClick={() => setShowPopup(false)}>Fechar</button>
          </div>
        )}

        <Cards
          nomes={nomes}
          valores={valores}
          informacoes={[
            "Recebido até hoje",
            "Boletos em aberto",
            "Pagamentos futuros",
          ]}
        />

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

