import { useState } from "react";
import { BiBarcode } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/images/logo.png";
import "./navBar.css";

export default function NavBar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmarLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <GiHamburgerMenu size={28} />
      </div>

      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div>
          <img src={logo} alt="Brasão de Caruaru" />
        </div>

        {role === "admin" && (
          <>
            <Link to="/visaoGeral" onClick={() => setIsMenuOpen(false)}>
              <MdDashboard size={24} />
              Visão Geral
            </Link>
            <Link to="/boletos" onClick={() => setIsMenuOpen(false)}>
              <BiBarcode size={24} />
              Boletos
            </Link>
            <Link to="/listagem" onClick={() => setIsMenuOpen(false)}>
              <HiOutlineViewList size={24} />
              Listagem
            </Link>
            <Link to="/veiculos" onClick={() => setIsMenuOpen(false)}>
              <FaTruck size={24} />
              Veículos
            </Link>
          </>
        )}

        {/* Links para user */}
        {role === "user" && (
          <>
            <Link to="/boletos" onClick={() => setIsMenuOpen(false)}>
              <BiBarcode size={24} />
              Boletos
            </Link>
            <Link to="/listagem" onClick={() => setIsMenuOpen(false)}>
              <HiOutlineViewList size={24} />
              Listagem
            </Link>
          </>
        )}

        <Link
          to="#"
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
        >
          <FiLogOut size={24} />
          Sair
        </Link>
      </div>

      {/* Modal de confirmação de logout */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Tem certeza que deseja sair?</p>
            <div className="modal-buttons">
              <button onClick={confirmarLogout}>Sim</button>
              <button onClick={() => setShowLogoutModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
