import './readStatus.scss';

type Props = {
  read: boolean;
};

export const ReadStatus = ({ read }: Props) => {
  const isLetterRead = read ? 'read' : 'unread';
  return <span className={`letter-status ${isLetterRead}`}>{isLetterRead}</span>;
};
