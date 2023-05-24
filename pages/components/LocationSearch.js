export default function LocationSearch({location, onSetLocation, geocodingResuts, onDetailsSearch, isVisible, onIsVisible}) {
    return (
        <header>
            <input
            type="text"
            placeholder="Search City"
            value={location}
            onChange={onSetLocation}
            onClick={onIsVisible}
            />
            <section>
                {(geocodingResuts && isVisible) && (
                <ul>
                    {geocodingResuts.map(r => (
                        <li key={r.id} onClick={() => onDetailsSearch(r)}>{`${r.name} ${r.country}`}</li>
                    ))}
                </ul>
                )}
            </section>
        </header>
    )
}