import { useState } from "react";
import { BiBarcode } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./navBar.css";

export default function NavBar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
      <div className="sidebar">
        <div>
          <img src={logo} alt="Brasão de Caruaru" />
        </div>

        {role === "admin" && (
          <>
            <Link to="/visaoGeral">
              <MdDashboard color="#151515" size={24} />
              Visão Geral
            </Link>
            <Link to="/boletos">
              <BiBarcode color="#151515" size={24} />
              Boletos
            </Link>
            <Link to="/listagem">
              <HiOutlineViewList color="#151515" size={24} />
              Listagem
            </Link>
            <Link to="/veiculos">
              <FaTruck color="#151515" size={24} />
              Veículos
            </Link>
          </>
        )}

        {role === "user" && (
          <>
            <Link to="/boletos">
              <BiBarcode color="#151515" size={24} />
              Boletos
            </Link>
            <Link to="/listagem">
              <HiOutlineViewList color="#151515" size={24} />
              Listagem
            </Link>
          </>
        )}

        <Link to="#" onClick={handleLogout}>
          <FiLogOut color="#151515" size={24} />
          Sair
        </Link>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Tem certeza que deseja sair?</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Sim
              </button>

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
