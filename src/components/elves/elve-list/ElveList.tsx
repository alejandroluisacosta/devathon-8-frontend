import { FaPlus } from 'react-icons/fa';
import { Elve } from '../../../interfaces';
import { ElveCarD } from '../elve-card/ElveCard';
import './elvelList.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  elvesList: Elve[];
};
export const ElveList = ({ elvesList }: Props) => {
  console.log({ elvesList });
  return (
    <div className="elves">
      {elvesList.map((elve) => (
        <ElveCarD key={elve.id} elve={elve} />
      ))}
      <NavLink className="nav-icon" to="/elve-form">
        <FaPlus />
      </NavLink>
    </div>
  );
};
