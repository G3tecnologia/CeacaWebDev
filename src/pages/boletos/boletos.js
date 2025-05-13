import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";
import Cards from "../../components/cards";
import NavBar from "../../components/navBar";
import Title from "../../components/title";
import "../listagem/listagem.css"; 

export default function Listagem() {
  const nomes = [
    "Baixados e Pagos: Valor",
    "Baixados sem Pagar: Valor",
    "Pendentes: Valor",
  ];
  const valores = ["R$ 45.678,90", "R$ 2.405", "R$ 10.353"];
  const informacoes = [
    "+20% month over month",
    "+33% month over month",
    "-8% month over month",
  ];

  const dadosMockados = [
    {
      id: 1,
      emissao: "07-05-2025",
      vencimento: "07-05-2025",
      parcela: "1/10",
      status: "Sim",
      valor: "10.000",
      juros: "300",
      multa: "250",
      pagamento: "07-05-2025",
      baixa: "...",
    },
    
  ];

  return (
    <div>
      <NavBar />
      <div className="content">
        <Title name="Listagem">
          <HiOutlineViewList size={25} color="#005816" />
        </Title>

        <Cards nomes={nomes} valores={valores} informacoes={informacoes} />

        <div className="filtro-tabela">
          <div className="filtro-container">
            <input type="text" placeholder="Search tickets..." />

            <input
              type="date"
              className="input-data"
              placeholder="Data inicial"
            />
            <input
              type="date"
              className="input-data"
              placeholder="Data final"
            />

            <button className="botao-filtro">Filtrar</button>
            <button className="botao-exportar">
              <FiSearch size={16} />
            </button>
          </div>

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
                {dadosMockados.map((item) => (
                  <tr key={item.id}>
                    <td>{item.emissao}</td>
                    <td>{item.vencimento}</td>
                    <td>{item.parcela}</td>
                    <td>{item.status}</td>
                    <td>{item.valor}</td>
                    <td>{item.juros}</td>
                    <td>{item.multa}</td>
                    <td>{item.pagamento}</td>
                    <td>{item.baixa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}