import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Login() {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Definição de credenciais estáticas
  const staticCredentials = {
    cpf_cnpj: "41887719415",
    password: "123456",
  };

  const validateInputs = () => {
    if (!cpfCnpj || cpfCnpj.length < 11 || cpfCnpj.length > 14) {
      setError("Digite um CPF ou CNPJ válido.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = () => {
    if (!validateInputs()) return;

    setLoading(true);

    setTimeout(() => {
      if (cpfCnpj === staticCredentials.cpf_cnpj && password === staticCredentials.password) {
        console.log("Login bem-sucedido, redirecionando...");
        navigate("/visaoGeral"); // Redireciona para a página de Visão Geral
      } else {
        setError("Credenciais inválidas!");
      }
      setLoading(false);
    }, 1000); // Simulando um pequeno atraso para experiência do usuário
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>Insira seu CPF ou CNPJ e senha para acessar</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Digite seu CPF ou CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleLogin}
          style={{
            ...styles.button,
            backgroundColor: loading ? "#6c757d" : "#007bff",
          }}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  container: {
    textAlign: "center",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "320px",
    background: "#fff",
  },
  logo: {
    width: "80px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "12px",
  },
};
