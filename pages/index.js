import { useEffect, useState } from "react"

import LocationSearch from "./components/LocationSearch";
import HourlyForecast from "./components/HorlyForecast";
import Card from "./components/Card";

export default function Home() {
  const [location, setlocation] = useState('');
  const [geocodingResuts, setGeocodingResults] = useState(null);
  const [daily, setDaily] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleDetailsSearch = d => {
    const { latitude, longitude, timezone } = d;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m,precipitation_probability&timezone=${timezone}`)
      .then(res => res.json()
      .then(res => setHourly(res.hourly))
    )

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,precipitation_probability_mean,windspeed_10m_max&timezone=${timezone}`)
      .then(res => res.json()
      .then(res => {
        const { temperature_2m_max, temperature_2m_min, precipitation_probability_mean, windspeed_10m_max, time } = res.daily;
        const packedState = [];

        for (let e = 0; e < temperature_2m_max.length; e++) {
          packedState.push({
            maximum: temperature_2m_max[e]
          })
        }

        for (let e = 0; e < temperature_2m_min.length; e++) {
          packedState[e].minimum = temperature_2m_min[e];
        }
        
        for (let e = 0; e < precipitation_probability_mean.length; e++) {
          packedState[e].precipitation = precipitation_probability_mean[e];
        }
        
        for (let e = 0; e < windspeed_10m_max.length; e++) {
          packedState[e].windspeed = windspeed_10m_max[e];
        }
        
        for (let e = 0; e < time.length; e++) {
          packedState[e].time = time[e];
        }

        setDaily(packedState);
        setIsVisible(false);
      })
    );
  }

  const handleSetLocation = e => {
    setlocation(e.target.value)
  }

  const handleIsVisible = () => {
    setIsVisible(true)
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`)
        .then(res => res.json())
        .then(res => setGeocodingResults(res.results));
    }, 600);

    return () => clearTimeout(timeOutId);
  }, [location])

  return (
    <main>
      <LocationSearch
        location={location}
        onSetLocation={handleSetLocation}
        geocodingResuts={geocodingResuts}
        onDetailsSearch={handleDetailsSearch}
        isVisible={isVisible}
        onIsVisible={handleIsVisible}
      />

      {(hourly || daily) && (
        <section className="content">
          {hourly && <HourlyForecast hourly={hourly} />}
          <div className="containerDaily">
            {daily && daily.map((day, index) => <Card key={index} data={day} />)}
          </div>
        </section>
      )}
    </main>
  )
}
