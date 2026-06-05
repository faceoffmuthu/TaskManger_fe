import React from 'react'
import { BarChart,
         Bar,
         XAxis,
         YAxis,
         CartesianGrid,
         Tooltip,
         Legend,
         ResponsiveContainer,
         Cell } from 'recharts';
import { useTheme } from '../../context/themeContext';

const CustomBarChart = ({data}) => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#e2e8f0' : '#555';

    // Function to alternate colors of the bars
    const getBarColor = (entry) => {
      switch (entry?.priority) {
        case "Low":
            return "#00BC7D";
        case "Medium":
            return "#FE9900";
        case "High":
            return "#FF1F57";
        default:
            return "#00BC7D";
      }
    };

    const CustomTooltip = ({active, payload}) => {
      if(active && payload && payload.length){
        return (
          <div className='bg-white dark:bg-slate-800 p-2.5 rounded-lg shadow-md border border-gray-300 dark:border-slate-700'>
            <p className='text-sm font-semibold text-purple-800 dark:text-purple-300 mb-1'>{payload[0].payload.priority}</p>
            <p className='text-base text-gray-600 dark:text-slate-300'>Count: {""}
                <span className='text-base font-medium text-gray-900 dark:text-slate-100'>{payload[0].payload.count}</span></p>
          </div>
        );
      }
      return null;
    };

  return (
    <div className='bg-transparent mt-6'>
        <ResponsiveContainer width="100%" height={305}>
            <BarChart data={data}>
                <CartesianGrid stroke="none" />
                <XAxis dataKey="priority"
                tick={{fontSize: 14, fill: tickColor}}
                stroke="none" />
                <YAxis tick={{fontSize: 14, fill: tickColor}}
                stroke="none" />
                <Tooltip content={CustomTooltip} cursor={{fill: "transparent"}} />
                <Bar dataKey="count"
                fill="#FF8042"
                radius={[10, 10, 0, 0]}
                activeDot={{r:8, fill:"green"}}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>

    </div>
  )
}

export default CustomBarChart
