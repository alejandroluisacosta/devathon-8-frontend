import './filterLetters.scss';

export const FilterLetters: React.FC<{ onClick: (status: string) => void }> = ({ onClick }) => {
    return (
        <div className="reader__filter">
            <button className="reader__filter__button" onClick={() => onClick('')}>All</button>
            <button className="reader__filter__button" onClick={() => onClick('read')}>Read</button>
            <button className="reader__filter__button" onClick={() => onClick('unread')}>Unread</button>
        </div>
    )
}