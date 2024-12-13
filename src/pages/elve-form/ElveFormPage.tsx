import { useParams } from 'react-router-dom';
import ElveForm from '../../components/elve-form/ElveForm';
import { useElves } from '../../hook';
import './ElveFormPage.scss';

export const ElveFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const { elves } = useElves();
  let elveToEdit = undefined;

  if (id) {
    elveToEdit = elves.find((elve) => elve.id === +id);
  }

  return (
    <div className="center">
      <ElveForm elve={elveToEdit} />
    </div>
  );
};
