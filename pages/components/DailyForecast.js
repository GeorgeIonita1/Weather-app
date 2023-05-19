import { sunnyIMG } from './helpers';

export default function DailyForecast({day}) {
    const { maximum, minimum, precipitation, windspeed } = day;

    return (
        <>
        <div className="dailyItem">
            <h3>Day</h3>
            <div className="cardItems">
                <p>Maximum: <span>{maximum}</span> °C</p>
                <p>Minimum: <span>{minimum}</span> °C</p>
                <p>Precipitation: <span>{precipitation}</span> %</p>
                <p>Wind: <span>{windspeed}</span> km/h</p>
            </div>
        </div>

        <div className="card">
            <h3>Monday</h3>
            <div className="cardColumns">
                <div className="cardImgWrapper">
                    <img src={sunnyIMG} />
                </div>
                <div className='cardDetails'>
                    <p>Maximum: <span>{maximum}</span> °C</p>
                    <p>Minimum: <span>{minimum}</span> °C</p>
                    <p>Precipitation: <span>{precipitation}</span> %</p>
                    <p>Wind: <span>{windspeed}</span> km/h</p>
                </div>
            </div>
        </div>
        </>
    );
}