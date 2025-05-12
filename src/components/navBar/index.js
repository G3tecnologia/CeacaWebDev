import { FiLogOut } from 'react-icons/fi';
import { HiOutlineViewList } from 'react-icons/hi';
import { MdDashboard } from "react-icons/md";
import { BiBarcode } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import './navBar.css';
import { FaTruck } from 'react-icons/fa';

export default function NavBar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role"); 

    function handleLogout(event) {
        event.preventDefault(); 
        const confirmLogout = window.confirm("Tem certeza que deseja sair?");
        if (confirmLogout) {
            localStorage.clear(); 
            navigate("/"); 
        }
    }

    return (
        <div className="sidebar">
            <div>
                <img src={logo} alt="Brasão de Caruaru" />
            </div>

            
            {role === "admin" && (
                <>
                    <Link to="/visaoGeral">
                        <MdDashboard color='#151515' size={24} />
                        Visão Geral
                    </Link>
                    <Link to="/boletos">
                        <BiBarcode color='#151515' size={24} />
                        Boletos
                    </Link>
                    <Link to="/listagem">
                        <HiOutlineViewList color='#151515' size={24} />
                        Listagem
                    </Link>
                    <Link to="/veiculos">
                        <FaTruck color='#151515' size={24} />
                        Veículos
                    </Link>
                </>
            )}

            {role === "user" && (
                <>
                    <Link to="/boletos">
                        <BiBarcode color='#151515' size={24} />
                        Boletos
                    </Link>
                    <Link to="/listagem">
                        <HiOutlineViewList color='#151515' size={24} />
                        Listagem
                    </Link>
                </>
            )}

            <Link to="#" onClick={handleLogout}>
                <FiLogOut color='#151515' size={24} />
                Sair
            </Link>
        </div>
    );
}
