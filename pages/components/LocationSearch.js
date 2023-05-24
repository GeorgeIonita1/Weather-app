export default function LocationSearch({location, onSetLocation, onGeocodingSearch, geocodingResuts, onDetailsSearch, isVisible, onIsVisible}) {
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
                    <li onClick={() => onDetailsSearch(r)}>{`${r.name} ${r.country}`}</li>
                    ))}
                </ul>
                )}
            </section>
        </header>
    )
}