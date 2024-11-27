import { useEffect, useState } from 'react';
import { LetterR } from '../../../interfaces/lettersResponse.interface';
import LetterModal from '../../letter-modal/LetterModal';
import './readerTable.scss';
import { ReadStatus } from './readt-status/ReadStatus';

type Props = {
  initalLetters: LetterR[];
};
export const ReaderTable = ({ initalLetters }: Props) => {
  const [letters, setLetters] = useState<LetterR[]>(initalLetters);
  const markAsRead = (id: number) => {
    //TODO: First implement markAsRead in backend and then update the state for de Virtual DOM
    const lettersUpdated = letters.map((letter) =>
      letter.id === id ? { ...letter, attributes: { ...letter.attributes, read: true } } : letter,
    );
    setLetters(lettersUpdated);
  };

  useEffect(() => {
    setLetters(initalLetters);
  }, [initalLetters]);

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          <tr className="table__head-tr">
            <th className="table__head-th">Sender</th>
            <th className="table__head-th">Subject</th>
            <th className="table__head-th table__head-th--hiden">Date</th>
            <th className="table__head-th">Status</th>
            <th className="table__head-th"></th>
          </tr>
        </thead>
        <tbody className="table__body">
          {letters.map((letter) => (
            <tr className="table__body-tr" key={letter.id}>
              <td className="table__body-td">
                <div className="table__body-sender">
                  <img
                    className="table__body-img"
                    src={letter.attributes.image}
                    alt={letter.attributes.sender}
                  />
                  <span className="table__body-td">{letter.attributes.sender}</span>
                </div>
              </td>
              <td className="table__body-td">{letter.attributes.sender}</td>
              <td className="table__body-td table__body-td--hiden">
                <time dateTime={new Date(letter.attributes.created_at).toLocaleDateString()}>
                  {new Date(letter.attributes.created_at).toLocaleDateString()}
                </time>
              </td>
              <td className="table__body-td">
                <ReadStatus read={letter.attributes.read} />
              </td>
              <td className="table__body-td">
                <LetterModal letter={letter} markAsRead={markAsRead} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
