import { FiLogOut } from 'react-icons/fi';
import { HiOutlineViewList } from 'react-icons/hi';
import { MdDashboard } from "react-icons/md";
import { BiBarcode } from 'react-icons/bi';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import './navBar.css';
import { FaTruck } from 'react-icons/fa';

export default function NavBar(){
    return(
        <div className="sidebar">
           <div>
            <img src={logo} alt="Brasão de Caruaru"/>
           </div>

           <Link to="/visaoGeral">
                 <MdDashboard color='#151515' size={24}></MdDashboard>
                Visão Geral
           </Link> 

           <Link to="/boletos">
                <BiBarcode color='#151515FFF' size={24}></BiBarcode>
                Boletos
           </Link> 

           <Link to="/listagem">
                <HiOutlineViewList color='#151515FFF' size={24}></HiOutlineViewList>
                Listagem
           </Link> 

           <Link to="/veiculos">
                <FaTruck color='#151515FFF' size={24}></FaTruck>
                Listagem
           </Link> 

           <Link to="#">
                <FiLogOut color='#151515FFF' size={24}></FiLogOut>
                Sair
           </Link> 
        </div>
    )
}