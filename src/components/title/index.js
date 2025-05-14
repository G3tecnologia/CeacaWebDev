import { useState } from "react";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "./title.css";

export default function Title({ children, name }) {
  const [showPopup, setShowPopup] = useState(false);
  const [cpfCnpj, setCpfCnpj] = useState(""); // valor digitado
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Função de validação CPF ou CNPJ
  const isValidCpfCnpj = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    return apenasNumeros.length === 11 || apenasNumeros.length === 14;
  };

  // Função para lidar com o clique em "Salvar"
  const onSalvar = async () => {
    const documentoValido = isValidCpfCnpj(cpfCnpj);
    if (!documentoValido) {
      setMensagem("CPF deve ter 11 dígitos ou CNPJ 14 dígitos.");
      return;
    }

    if (!senhaAntiga || !novaSenha) {
      setMensagem("Por favor, preencha a senha antiga e a nova senha.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/api/clientes/update-password",
        {
          cpf_cnpj: cpfCnpj, 
          oldPassword: senhaAntiga, 
          newPassword: novaSenha,
        }
      );

      if (response.data.sucesso) {
        setMensagem("Senha atualizada com sucesso!");
        setShowPopup(false);
        console.log("menssagem 1: ", response)
      } else {
        setMensagem(response.data.mensagem || "Erro ao atualizar senha.");
        console.log("menssagem 2 : ", response)
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
      console.log("menssagem 3 : ", error)
    }
  };

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
              onChange={(e) => setCpfCnpj(e.target.value)}
              placeholder="Digite seu CPF ou CNPJ"
            />
          </label>

          <label>
            Antiga Senha:
            <input
              type="password"
              value={senhaAntiga}
              onChange={(e) => setSenhaAntiga(e.target.value)}
              placeholder="Digite sua senha atual"
            />
          </label>

          <label>
            Nova Senha:
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite a nova senha"
            />
          </label>

          {mensagem && <p className="mensagem">{mensagem}</p>}

          <div className="user-forms-buttons">
            <button className="button salvar" onClick={onSalvar}>
              Salvar
            </button>
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
