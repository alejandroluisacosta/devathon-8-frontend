import { useRef } from 'react';
import './LetterModal.scss';
import { InterfaceLetter } from '../../interfaces/letter.interface';
import { IoClose } from 'react-icons/io5';

interface LetterProps {
  letter: InterfaceLetter;
}

const LetterModal = ({ letter: { content, date, image, read, sender, subject } }: LetterProps) => {
  const modalLetter = useRef<HTMLDialogElement>(null);

  const showLetter = () => {
    modalLetter.current?.showModal();
  };

  const hideLetter = () => {
    modalLetter.current?.close();
  };

  const formatDate = date.toLocaleDateString();

  return (
    <>
      <button className="btn" aria-label="open" onClick={showLetter}>
        Open letter
      </button>

      <dialog ref={modalLetter} className="letter">
        <h2 className="letter__title">DEAR SANTA</h2>

        <h4 className="letter__subject">I want to talk with you about {subject}</h4>

        <p className="letter__content">{content}</p>

        <p className="letter__date">
          <span>{sender}</span> <time dateTime={formatDate}>{formatDate}</time>
        </p>

        <button className="btn btn-close" aria-label="close" onClick={hideLetter}>
          <IoClose />
        </button>

        {read && <div className="letter__stamp">READ IT</div>}
      </dialog>
    </>
  );
};

export default LetterModal;
