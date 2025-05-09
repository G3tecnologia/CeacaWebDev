import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTruck } from "react-icons/fa";
import NavBar from "../../components/navBar";
import Title from "../../components/title";
import "./veiculo.css";

export default function Veiculos() {
  const [historico, setHistorico] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filtro, setFiltro] = useState("todos");
  const [valorMotorista, setValorMotorista] = useState("");
  const [valorMes, setValorMes] = useState("");
  const [valorDia, setValorDia] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3002/api/historico-entrada?page=${page}&limit=7`)
      .then((res) => res.json())
      .then((data) => {
        setHistorico(data.historico);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        alert("Erro ao buscar dados: " + error);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const buscarFiltro = () => {
    setLoading(true);
    let url = "http://localhost:3002/api/historico-entrada-filtrado";

    if (filtro === "motorista") {
      url += `?motorista=${encodeURIComponent(valorMotorista)}`;
    } else if (filtro === "mes") {
      url += `?mes=${valorMes}`;
    } else if (filtro === "dia") {
      const dia = valorDia.split("-").reverse().join(""); // de '2025-03-01' para '01032025'
      url += `?dia=${dia}`;
    } else if (filtro === "mes_motorista") {
      url += `?mes=${valorMes}&motorista=${encodeURIComponent(valorMotorista)}`;
    } else {
      // modo padrão (todos)
      url = `http://localhost:3002/api/historico-entrada?page=${page}&limit=7`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHistorico(data.historico || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => alert("Erro ao filtrar: " + err))
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
            style={{
              display:
                filtro === "motorista" || filtro === "mes_motorista"
                  ? "inline"
                  : "none",
            }}
          />

          <select
            value={valorMes}
            onChange={(e) => setValorMes(e.target.value)}
            style={{
              display:
                filtro === "mes" || filtro === "mes_motorista"
                  ? "inline"
                  : "none",
            }}
          >
            <option value="">Selecione o mês</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

          <input
            type="date"
            value={valorDia}
            onChange={(e) => setValorDia(e.target.value)}
            style={{ display: filtro === "dia" ? "inline" : "none" }}
          />

          <button onClick={buscarFiltro}>Buscar</button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
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
              {historico.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {new Date(item.data_hora_entrada).toLocaleString("pt-BR")}
                  </td>
                  <td>{item.placa}</td>
                  <td>{item.motorista}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="tabela-footer">
          <div className="paginacao">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <FaArrowLeft color="#FFF" size={18} />
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              <FaArrowRight color="#FFF" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
