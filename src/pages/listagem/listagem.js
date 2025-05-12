import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
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
  const [totalPagos, setTotalPagos] = useState(0);
  const [totalPendentes, setTotalPendentes] = useState(0);

  // Função para buscar boletos na API
  const buscarBoletos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3002/api/boletos");
      const boletosRecebidos = response.data.boletos || [];

      setBoletos(boletosRecebidos);

      // Calcular total de boletos pagos e pendentes
      const totalPago = boletosRecebidos
        .filter((b) => b.data_pagamento) // Considera apenas os pagos
        .reduce((acc, b) => acc + Number(b.valor), 0);

      const totalPendente = boletosRecebidos
        .filter((b) => !b.data_pagamento) // Considera apenas os pendentes
        .reduce((acc, b) => acc + Number(b.valor), 0);

      setTotalPagos(totalPago);
      setTotalPendentes(totalPendente);
    } catch (error) {
      console.error("Erro ao buscar boletos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar boletos ao montar o componente
  useEffect(() => {
    buscarBoletos();
  }, []);

  // Filtrar boletos por mês selecionado
  const boletosFiltrados = mesFiltro
    ? boletos.filter((b) => new Date(b.data_vencimento_parcelas_receber).getMonth() + 1 === parseInt(mesFiltro))
    : boletos;

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Listagem">
          <HiOutlineViewList size={25} />
        </Title>

        {/* 🔹 Divs de totais pagos e pendentes */}
        <div className="resumo-boletos">
          <div className="box-pagos">
            <h3>Baixados e Pagos</h3>
            <p>R$ {totalPagos.toFixed(2)}</p>
          </div>
          <div className="box-pendentes">
            <h3>Baixados sem Pagar</h3>
            <p>R$ {totalPendentes.toFixed(2)}</p>
          </div>
        </div>

        {/* 🔹 Filtros */}
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
          )}
        </div>
      </div>
    </div>
  );
}
