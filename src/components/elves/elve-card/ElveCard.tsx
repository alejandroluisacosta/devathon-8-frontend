import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { Elve } from '../../../interfaces';
import './elveCard.scss';

type Props = {
  elve: Elve;
};

export const ElveCarD = ({ elve }: Props) => {
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
            <span className="elve__number">
              {elve.height} <span className="elve__number-m">m</span>
            </span>
            <span className="elve__data">Height</span>
          </div>
        </div>

        <div className="elve__actions">
          <NavLink to={`/elve-form/${elve.id}`} className="elve__btn elve__btn--edit">
            <IoCreateOutline className="elve__icon" strokeWidth={20} />
            Edit
          </NavLink>
          <button className="elve__btn elve__btn--delete">
            <IoTrashOutline className="elve__icon" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};
