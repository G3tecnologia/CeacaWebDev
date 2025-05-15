import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import NavBar from "../../components/navBar";
import Title from "../../components/title";
import "../listagem/listagem.css";
import axios from "axios";

export default function Boletos() {
  const [boletos, setBoletos] = useState([]);
  const [mesFiltro, setMesFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("pendente");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    buscarBoletos();
  }, [mesFiltro, statusFiltro, page]);

  const buscarBoletos = async () => {
    setLoading(true);
    try {
      const pagoFiltro = statusFiltro === "pago" ? "PG" : "NÃO"; 
      const response = await axios.get(
        `http://localhost:3002/api/boletos?page=${page}&mes=${mesFiltro}&pago=${pagoFiltro}`
      );

      setBoletos(response.data.boletos || []);
      const total = response.data.total || 0;
      setTotalPages(Math.ceil(total / 13)); // Ajuste conforme limite da API
    } catch (error) {
      console.error("Erro ao buscar boletos:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (data) => {
    return data && Date.parse(data) ? new Date(data).toLocaleDateString("pt-BR") : "Data inválida";
  };

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Boletos Mensais">
          <HiOutlineViewList size={25} color="#000" />
        </Title>

        <div className="filtro-container">
          <select value={mesFiltro} onChange={(e) => setMesFiltro(e.target.value)}>
            <option value="">Selecione o mês</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2025, i).toLocaleString("pt-BR", { month: "long" })}
              </option>
            ))}
          </select>

          <select value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)}>
            <option value="pendente">Pendentes</option>
            <option value="pago">Pagos</option>
          </select>

          <button className="botao-filtro" onClick={buscarBoletos}>
            <FiSearch size={16} /> Filtrar
          </button>
        </div>

        {loading ? (
          <p>Carregando boletos...</p>
        ) : boletos.length ? (
          <>
            <h3>{statusFiltro === "pago" ? "Boletos Pagos" : "Boletos Pendentes"}</h3>
            <div className="tabela-container">
              <table>
                <thead>
                  <tr>
                    <th>Emissão</th>
                    <th>Vencimento</th>
                    <th>Status</th>
                    <th>Valor</th>
                    <th>Juros</th>
                    <th>Multa</th>
                  </tr>
                </thead>
                <tbody>
                  {boletos.map((item) => (
                    <tr key={item.id}>
                      <td>{formatarData(item.data_emissao)}</td>
                      <td>{formatarData(item.data_vencimento_parcelas_receber)}</td>
                      <td>{item.pago === "PG" ? "Pago" : "Pendente"}</td>
                      <td>R$ {Number(item.valor).toFixed(2)}</td>
                      <td>R$ {Number(item.juros).toFixed(2)}</td>
                      <td>R$ {Number(item.multa).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Adicionando paginação */}
            <div className="tabela-footer">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                <FaArrowLeft size={18} />
              </button>

              <span>
                {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                <FaArrowRight size={18} />
              </button>
            </div>
          </>
        ) : (
          <p>Nenhum boleto {statusFiltro === "pago" ? "pago" : "pendente"} encontrado.</p>
        )}
      </div>
    </div>
  );
}
