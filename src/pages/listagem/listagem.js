import { useEffect, useState } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";
import { BiDownload } from "react-icons/bi"; 
import axios from "axios"; 
import NavBar from "../../components/navBar";
import Title from "../../components/title";
import "../listagem/listagem.css"; 

export default function Listagem() {
  const [boletos, setBoletos] = useState([]); 
  const [mesFiltro, setMesFiltro] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const role = localStorage.getItem("role");
  const idUsuario = localStorage.getItem("id");

  
  const apiUrl = role === "admin"
    ? `http://localhost:3002/api/boletos?page=${page}`
    : `http://localhost:3002/api/meus-boletos?page=${page}&id=${idUsuario}`;

  const buscarBoletos = async () => {
    setLoading(true);

    if (!idUsuario) {
      console.error("Erro: ID do usuário não encontrado no localStorage.");
      return;
    }

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      });

      setBoletos(response.data.boletos || []);

      
      const total = response.data.total || 0;
      setTotalPages(Math.ceil(total / 13));

    } catch (error) {
      console.error("Erro ao buscar boletos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarBoletos();
  }, [page]);

  const boletosFiltrados = mesFiltro
    ? boletos.filter((b) => new Date(b.data_vencimento_parcelas_receber).getMonth() + 1 === parseInt(mesFiltro))
    : boletos;

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name={role === "admin" ? "Listagem Geral" : "Meus Boletos"}>
          <HiOutlineViewList size={25} />
        </Title>

        <div className="filtro-tabela">
          <div className="filtro-container">
            <select value={mesFiltro} onChange={(e) => setMesFiltro(e.target.value)}>
              <option value="">Todos os meses</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2025, i).toLocaleString("pt-BR", { month: "long" })}
                </option>
              ))}
            </select>

            <button className="botao-filtro" onClick={buscarBoletos}>
              <FiSearch size={16} />
              Buscar
            </button>
          </div>

          {loading ? (
            <p>Carregando boletos...</p>
          ) : (
            <>
              <div className="tabela-container">
                <table>
                  <thead>
                    <tr>
                      <th>Emissão</th>
                      <th>Dt. Vencimento</th>
                      <th>Parcela</th>
                      <th>Status</th>
                      <th>Valor</th>
                      <th>Juros</th>
                      <th>Multa</th>
                      <th>Dt. Pagamento</th>
                      <th>Baixa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boletosFiltrados.length > 0 ? (
                      boletosFiltrados.map((item) => (
                        <tr key={item.id_parcelas_receber}>
                          <td>{new Date(item.data_emissao).toLocaleDateString("pt-BR")}</td>
                          <td>{new Date(item.data_vencimento_parcelas_receber).toLocaleDateString("pt-BR")}</td>
                          <td>{item.parcelas}</td>
                          <td>{item.status_remessa}</td>
                          <td>R$ {(Number(item.valor) || 0).toFixed(2)}</td>
                          <td>R$ {(Number(item.juros) || 0).toFixed(2)}</td>
                          <td>R$ {(Number(item.multa) || 0).toFixed(2)}</td>
                          <td>{item.data_pagamento ? new Date(item.data_pagamento).toLocaleDateString("pt-BR") : "-"}</td>
                          <td>
                            {item.url_webservice ? (
                              <a href={item.url_webservice} target="_blank" rel="noopener noreferrer">
                                <BiDownload size={18} />
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" style={{ textAlign: "center" }}>Nenhum boleto encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

             
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <FiChevronLeft />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-btn ${page === i + 1 ? "active" : ""}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="page-btn"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  <FiChevronRight />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
