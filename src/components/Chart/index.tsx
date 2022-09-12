import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title,  
  ArcElement, Tooltip, Legend} from 'chart.js';

  import { IMGraphData } from '../../interfaces/ResumeInterfaces';

import './styles.scss';

interface ChartProps{ data: IMGraphData }

ChartJS.register(LineController, LineElement, 
  PointElement, LinearScale, Title,
  ArcElement, Tooltip, Legend);

const options = {
    plugins: {
      legend:{
        labels:{
          boxWidth: 50,
          boxHeight: 18,
          color: '#FFFFFF',
          font:{  size: 16 }
        }
      }
    }
}

export function MyChart({ data }: ChartProps){
  const [chartData, setChartData] = useState({
    labels: ['Ações', 'Real State', 'Cash', 'International'],
    datasets: [
      {
        label: 'Stocks',
        data: [data.a, data.b, data.c, data.d],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 3,
      },
    ],
  });

  useEffect(()=>{
    setChartData({
      labels: ['Ações', 'Real State', 'Cash', 'International'],
      datasets: [
        {
          label: 'Stocks',
          data: [data.a, data.b, data.c, data.d],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(153, 102, 255, 0.8)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 3,
        },
      ],
    });
  },[data]);

  const plugin = {
    id: 'custom_canvas_background_color',
    // beforeDraw: (chart: any) => {
    //   const {ctx} = chart;
    //   ctx.save();
    //   ctx.globalCompositeOperation = 'destination-over';
    //   ctx.fillStyle = 'lightGreen';
    //   ctx.fillRect(0, 0, chart.width, chart.height);
    //   ctx.restore();
    // }
  };

  return(
    <div className="chart-container">
      <Doughnut options={options}  data={chartData} /*plugins={[plugin]}*/ />

    </div>
  )
}