import './cards.css'

export default function Cards({ nomes, valores, informacoes }) {
    return (
      <div className="cards">
        <div className="card verde">
          <p className="nome">{nomes[0]}</p>
          <p className="valor">{valores[0]}</p>
          <span className="informacao">{informacoes[0]}</span>
        </div>
  
        <div className="card vermelho">
          <p className="nome">{nomes[1]}</p>
          <p className="valor">{valores[1]}</p>
          <span className="informacao">{informacoes[1]}</span>
        </div>
      </div>
    );
  }
  