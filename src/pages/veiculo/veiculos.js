import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTruck } from "react-icons/fa";
import NavBar from "../../components/navBar";
import Title from "../../components/title";
import "./veiculo.css";

export default function Veiculos() {
  const [historico, setHistorico] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filtro, setFiltro] = useState("todos");
  const [valorMotorista, setValorMotorista] = useState("");
  const [valorMes, setValorMes] = useState("");
  const [valorDia, setValorDia] = useState("");

  useEffect(() => {
    buscarDados();
  }, [page, filtro]);

  const buscarDados = () => {
    setLoading(true);
    let url = filtro !== "todos" ? "http://localhost:3002/api/historico-entrada-filtrado" : `http://localhost:3002/api/historico-entrada?page=${page}&limit=7`;

    if (filtro === "motorista") {
      url += `?motorista=${encodeURIComponent(valorMotorista)}&page=${page}`;
    } else if (filtro === "mes") {
      url += `?mes=${valorMes}&page=${page}`;
    } else if (filtro === "dia") {
      const diaFormatado = parseInt(valorDia.split("-")[2]);
      url += `?dia=${diaFormatado}&page=${page}`;
    } else if (filtro === "mes_motorista") {
      url += `?mes=${valorMes}&motorista=${encodeURIComponent(valorMotorista)}&page=${page}`;
    }

    console.log("URL da requisição:", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados retornados:", data);
        setHistorico(Array.isArray(data) ? data : data.historico || []);
        setTotalRegistros(data.total || historico.length);
        setTotalPages(Math.max(1, Math.ceil((data.total || historico.length) / 7))); 
      })
      .catch((err) => console.error("Erro ao buscar dados:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Entrada de Veículos">
          <FaTruck color="#005816" size={25} />
        </Title>

        <div className="filtros-container">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="motorista">Por Motorista</option>
            <option value="mes">Por Mês</option>
            <option value="dia">Por Dia</option>
            <option value="mes_motorista">Por Mês e Motorista</option>
          </select>

          <input
            type="text"
            placeholder="Nome do motorista"
            value={valorMotorista}
            onChange={(e) => setValorMotorista(e.target.value)}
            style={{ display: filtro.includes("motorista") ? "inline" : "none" }}
          />

          <select
            value={valorMes}
            onChange={(e) => setValorMes(e.target.value)}
            style={{ display: filtro.includes("mes") ? "inline" : "none" }}
          >
            <option value="">Selecione o mês</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2025, i).toLocaleString("pt-BR", { month: "long" })}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={valorDia}
            onChange={(e) => setValorDia(e.target.value)}
            style={{ display: filtro === "dia" ? "inline" : "none" }}
          />

          <button onClick={() => { setPage(1); buscarDados(); }}>Buscar</button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : historico.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATA/HORA</th>
                <th>PLACA</th>
                <th>MOTORISTA</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{new Date(item.data_hora_entrada).toLocaleString("pt-BR")}</td>
                  <td>{item.placa}</td>
                  <td>{item.motorista}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Nenhum dado encontrado para o filtro selecionado.
          </p>
        )}

        <div className="tabela-footer">
          <div className="paginacao">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              <FaArrowLeft color="#FFF" size={18} />
            </button>

            <span>{page} / {totalPages} </span> 

            <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
              <FaArrowRight color="#FFF" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
