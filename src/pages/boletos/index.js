import NavBar from "../../components/navBar";
import Title from "../../components/title";
import { BiBarcode } from 'react-icons/bi';

export default function Boletos(){
    return(
        <div>
            <NavBar></NavBar>
            <div className="content">
            <Title name="Boletos">
                <BiBarcode size={25} />
            </Title>
                
            </div>
        </div>
    )
}