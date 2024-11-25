import { useRef } from 'react';
import { IoClose, IoMailOpenOutline, IoMailOutline } from 'react-icons/io5';
import { LetterR } from '../../interfaces/lettersResponse.interface';
import './LetterModal.scss';

interface LetterProps {
  letter: LetterR;
  markAsRead: (id: number) => void;
}

const LetterModal = ({ letter: { attributes, id }, markAsRead }: LetterProps) => {
  const modalLetter = useRef<HTMLDialogElement>(null);

  const showLetter = () => {
    modalLetter.current?.showModal();
  };

  const hideLetter = () => {
    modalLetter.current?.close();
    markAsRead(id);
  };

  const formatDate = new Date(attributes.created_at).toLocaleDateString();

  return (
    <>
      <button className="" aria-label="open" onClick={showLetter}>
        {attributes.read ? <IoMailOpenOutline size={20} /> : <IoMailOutline size={20} />}
      </button>

      <dialog ref={modalLetter} className="letter">
        <h2 className="letter__title">DEAR SANTA</h2>

        <h4 className="letter__subject">I want to talk with you about {attributes.subject}</h4>

        <p className="letter__content">{attributes.content}</p>

        <p className="letter__date">
          <span>{attributes.sender}</span> <time dateTime={formatDate}>{formatDate}</time>
        </p>

        <button className="btn btn-close" aria-label="close" onClick={hideLetter}>
          <IoClose />
        </button>

        {attributes.read && <div className="letter__stamp">READ</div>}
      </dialog>
    </>
  );
};

export default LetterModal;
