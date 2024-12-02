import { ElveList } from '../../components';
import { useElves } from '../../hook';

export const ElvesPage = () => {
  const { elves } = useElves();
  return (
    <section>
      <ElveList elvesList={elves} />
    </section>
  );
};
