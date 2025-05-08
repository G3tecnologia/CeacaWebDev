import NavBar from "../../components/navBar";
import Title from "../../components/title";

import { HiOutlineViewList } from 'react-icons/hi';

export default function Listagem() {
  return (
    <div>
        <NavBar />

      <div className="content">
        <Title name="Listagem">
          <HiOutlineViewList size={25} />
        </Title>
      </div>
    </div>
  );
}
