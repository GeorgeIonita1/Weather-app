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
import Card from './Card';
  
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

  const cardData = {
    feel: apparent_temperature[localTime],
    windspeed: windspeed_10m[localTime],
    precipitation: precipitation_probability[localTime],
    humidity: relativehumidity_2m[localTime],
    temperature: temperature_2m[localTime],
  }

  return (
    <div className='hourlyWrapper'>
      <div className='hourlyTable'>
        <Line options={options} data={data} />
      </div>
      <div className='hourlyDetails'>
        <Card data={cardData} />
      </div>
    </div>
  );
}