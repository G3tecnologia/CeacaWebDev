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
  const [valorPlaca, setValorPlaca] = useState("");
  const [valorDescricao, setValorDescricao] = useState("");
  const [valorData, setValorData] = useState("");
  const [valorMes, setValorMes] = useState("");

  // Quando mudar o filtro, limpa os valores para evitar dados misturados
  useEffect(() => {
    setValorMotorista("");
    setValorPlaca("");
    setValorDescricao("");
    setValorData("");
    setValorMes("");
  }, [filtro]);

  // Busca dados sempre que qualquer dependência mudar
  useEffect(() => {
    buscarDados();
  }, [page, filtro, valorMotorista, valorPlaca, valorDescricao, valorData, valorMes]);

  const buscarDados = () => {
    setLoading(true);
    let url = "http://localhost:3002/api/historico-entrada-filtrado?";
    let params = [];

    if (filtro === "motorista" && valorMotorista.trim()) {
      params.push(`motorista=${encodeURIComponent(valorMotorista.trim())}`);
    }
    if (filtro === "placa" && valorPlaca.trim()) {
      params.push(`placa=${encodeURIComponent(valorPlaca.trim())}`);
    }
    if (filtro === "descricao" && valorDescricao.trim()) {
      params.push(`descricao_mercadoria_veiculo=${encodeURIComponent(valorDescricao.trim())}`);
    }
    if (filtro === "data" && valorData) {
      const partes = valorData.split("-");
      if (partes.length === 3) {
        const diaFormatado = parseInt(partes[2], 10);
        params.push(`dia=${diaFormatado}`);
      }
    }
    if (filtro === "mes" && valorMes) {
      params.push(`mes=${valorMes}`);
    }

    // Paginação
    params.push(`page=${page}`);
    params.push(`limit=7`);

    url += params.join("&");

    console.log("🚀 URL gerada:", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("🧐 Dados retornados pela API:", data);
        setHistorico(Array.isArray(data.historico) ? data.historico : []);
        setTotalRegistros(data.total || 0);
        setTotalPages(Math.max(1, Math.ceil((data.total || 0) / 7)));
      })
      .catch((err) => console.error("❌ Erro ao buscar dados:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Entrada de Veículos">
          <FaTruck color="#000" size={25} />
        </Title>

        <div className="filtros-container">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="motorista">Por Motorista</option>
            <option value="placa">Por Placa</option>
            <option value="descricao">Por Descrição da Mercadoria</option>
            <option value="data">Por Dia</option>
            <option value="mes">Por Mês</option>
          </select>

          <input
            type="text"
            placeholder="Nome do motorista"
            value={valorMotorista}
            onChange={(e) => setValorMotorista(e.target.value)}
            style={{ display: filtro === "motorista" ? "inline" : "none" }}
          />
          <input
            type="text"
            placeholder="Placa do veículo"
            value={valorPlaca}
            onChange={(e) => setValorPlaca(e.target.value)}
            style={{ display: filtro === "placa" ? "inline" : "none" }}
          />
          <input
            type="text"
            placeholder="Descrição da Mercadoria"
            value={valorDescricao}
            onChange={(e) => setValorDescricao(e.target.value)}
            style={{ display: filtro === "descricao" ? "inline" : "none" }}
          />
          <input
            type="date"
            value={valorData}
            onChange={(e) => setValorData(e.target.value)}
            style={{ display: filtro === "data" ? "inline" : "none" }}
          />

          <select
            value={valorMes}
            onChange={(e) => setValorMes(e.target.value)}
            style={{ display: filtro === "mes" ? "inline" : "none" }}
          >
            <option value="">Selecione o mês</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2025, i).toLocaleString("pt-BR", { month: "long" })}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setPage(1);
              // O useEffect vai disparar buscarDados, então não chama aqui
            }}
          >
            Buscar
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : historico.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>CODIGO</th>
                <th>DATA/HORA</th>
                <th>PLACA</th>
                <th>MOTORISTA</th>
                <th>MERCADORIA</th>
                <th>PESO (kg)</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{new Date(item.data_hora_entrada).toLocaleString("pt-BR")}</td>
                  <td>{item.placa}</td>
                  <td>{item.motorista}</td>
                  <td>{item.descricao_mercadoria_veiculo || "Não informado"}</td>
                  <td>
                    {parseFloat(item.peso_mercadoria).toLocaleString("pt-BR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}{" "}
                    kg
                  </td>
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
  );
}
