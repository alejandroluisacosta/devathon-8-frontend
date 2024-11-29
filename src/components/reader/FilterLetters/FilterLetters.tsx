import './filterLetters.scss';

export const FilterLetters = () => {
    return (
        <div className="reader__filter">
            <button className="reader__filter__button">All</button>
            <button className="reader__filter__button">Read</button>
            <button className="reader__filter__button">Unread</button>
        </div>
    )
}