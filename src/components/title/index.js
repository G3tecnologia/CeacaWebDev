import { useState } from "react";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import './title.css'

export default function Title({
  children,
  name,
  cpfCnpj,
  onCpfCnpjChange,
  senhaAntiga,
  onSenhaAntigaChange,
  novaSenha,
  onNovaSenhaChange,
  onSalvar,
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="title">
      <div>
        {children}
        <span>{name}</span>
      </div>

      <div className="user-icone" onClick={() => setShowPopup(!showPopup)}>
        <FaUserCircle size={30} color="#333" />
        <FaChevronDown size={20} color="#333" />
      </div>

      {showPopup && (
        <div className="user-forms">
          <h4>Editar Perfil</h4>

          <label>
            CPF/CNPJ:
            <input
              type="text"
              value={cpfCnpj}
              onChange={onCpfCnpjChange}
              disabled="true"
            />
          </label>

          <label>
            Antiga Senha:
            <input
              type="password"
              value={senhaAntiga}
              onChange={onSenhaAntigaChange}
              disabled="true"
            />
          </label>

          <label>
            Nova Senha:
            <input
              type="password"
              value={novaSenha}
              onChange={onNovaSenhaChange}
              placeholder="Digite a nova senha"
            />
          </label>

          <div className="user-forms-buttons">
            <button className="button salvar" onClick={onSalvar}>Salvar</button>
            <button
              className="button cancelar"
              onClick={() => setShowPopup(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
