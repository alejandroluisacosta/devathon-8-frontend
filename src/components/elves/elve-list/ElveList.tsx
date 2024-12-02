import { Elve } from '../../../interfaces';
import { ElveCarD } from '../elve-card/ElveCard';
import './elvelList.scss';

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
    </div>
  );
};
