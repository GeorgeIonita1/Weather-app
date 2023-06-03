import Image from 'next/image';

import { sunny } from './assets';

export default function Card({data}) {
    const { maximum, minimum, precipitation, windspeed, feel, humidity, temperature, time } = data;

    return (
        <div className="card">
                <div className="cardHeader">
                    <h4>Monday</h4>
                    {maximum && <h3>{maximum} °C</h3>}
                    {temperature && <h3>{temperature} °C</h3>}
                    
                </div>

                <div className='cardFooter'>
                    <div className="cardFooterImgWrapper">
                        <Image
                            src={sunny.source}
                            fill
                            alt={sunny.description}
                        />
                    </div>
                    <div className='cardFooterDetails'>
                        {maximum && <p>Maximum: <span>{maximum} °C </span></p>}
                        {minimum && <p>Minimum: <span>{minimum} °C </span></p>}
                        {feel && <p>Feels like: <span>{feel} °C </span></p>}
                        {humidity && <p>Humidity: <span>{humidity} % </span></p>}
                        <p>Precipitation: <span>{precipitation} % </span></p>
                        <p>Wind: <span>{windspeed} km/h </span></p>
                    </div>
                </div>
            </div>
    );
}