import { Elve } from '../../../interfaces';
import { ElveCart } from '../elve-card/ElveCart';
import './elvelList.scss';

type Props = {
  elvesList: Elve[];
};
export const ElveList = ({ elvesList }: Props) => {
  console.log({ elvesList });
  return (
    <div className="elves">
      {elvesList.map((elve) => (
        <ElveCart key={elve.id} elve={elve} />
      ))}
    </div>
  );
};
