export default function LocationSearch({onSetLocation, onGeocodingSearch, geocodingResuts, onDetailsSearch, isVisible, onIsVisible}) {
    return (
        <header>
            <button onClick={onGeocodingSearch}>Search</button>
            <input
            type="text"
            placeholder="Search City"
            onChange={onSetLocation}
            onClick={onIsVisible}
            />
            <section>
                {(geocodingResuts && isVisible) && (
                <ul>
                    {geocodingResuts.map(r => (
                    <li onClick={() => onDetailsSearch(r)}>{`${r.name} ${r.country}`}</li>
                    ))}
                </ul>
                )}
            </section>
        </header>
    )
}