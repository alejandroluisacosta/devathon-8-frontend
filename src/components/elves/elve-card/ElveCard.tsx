import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { Elve } from '../../../interfaces';
import './elveCard.scss';

type Props = {
  elve: Elve;
};

export const ElveCarD = ({ elve }: Props) => {
  const handleDelete = () => {
    const url = `http://127.0.0.1:8000/api/v1/labor-registration/${elve.id}`;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
      },
    };

    fetch(url, options);

    

  };

  return (
    <article className="elve">
      <div className="elve__hero">
        <img className="elve__avatar" src={elve.image} alt={elve.name} />
      </div>

      <div className="elve__container">
        <h3 className="elve__name">{elve.name}</h3>
        <p className="elve__email">{elve.email}</p>

        <div className="elve__info">
          <div className="elve__content">
            <span className="elve__number">{elve.age}</span>
            <span className="elve__data">Age</span>
          </div>
          <div className="elve__content">
            <span className="elve__number">{elve.height}</span>
            <span className="elve__data">Height</span>
          </div>
        </div>

        <div className="elve__actions">
          <button className="elve__btn elve__btn--edit">
            <IoCreateOutline className="elve__icon" strokeWidth={20} />
            Edit
          </button>
          <button className="elve__btn elve__btn--delete" onClick={handleDelete}>
            <IoTrashOutline className="elve__icon" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};
