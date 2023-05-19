import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    innerWidth: '100%',
    width: '100%',
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

export default function HourlyForecast({hourly, localTime}) {
  const { time, apparent_temperature, relativehumidity_2m, temperature_2m, windspeed_10m, precipitation_probability} = hourly;
  const labels = time.slice(localTime, localTime + 24).map(e => e.slice(-5));
  const myData = temperature_2m.slice(localTime, localTime + 24);

  const data = {
    labels,
    datasets: [{
        label: 'Temperature',
        data: myData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }]
  }

  return (
    <div className='hourlyWrapper'>
      <div className='hourlyTable'>
        <Line options={options} data={data} />
      </div>
      <div className='hourlyDetails'>
        <div className='card'>
          <h3>{temperature_2m[localTime]} °C</h3>
          <div className='cardItems'>
            <p>Feels like: <span>{apparent_temperature[localTime]} °C</span></p>
            <p>Humidity: <span>{relativehumidity_2m[localTime]} %</span></p>
            <p>Wind: <span>{windspeed_10m[localTime]} km/h</span></p>
            <p>Precipitation: <span>{precipitation_probability[localTime]} %</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}