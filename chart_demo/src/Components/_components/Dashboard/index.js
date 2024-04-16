import React from 'react';
import styles from './Dsahbaord.module.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    BarChart,
    Bar
} from 'recharts';
import fetchData from "../../../utils/httpAction";


const Dashboard = () => {

    const [data, setData] = React.useState({xData: [], yData: []});

    React.useEffect(() => {
        (async () => {
            const ydata = await fetchData({endPoint: 'o5zMs5/data'});
            const xdata = await fetchData({endPoint: 'gDa8uC/data'});
            setData(() => ({
                xData: Object.values(xdata) || [],
                yData: Object.values(ydata) || []
            }))
        })()
    }, []);

    const chartData = React.useMemo(() => {
        return data?.xData.slice(0, 50).map((item, index) => ({
            x: item.Label,
            y: parseFloat(data?.yData[index].RandomNumber)
        }))
    }, [data?.xData, data?.yData]);

    return (
        <div className={styles.mainContainer}>
            <h2>Chart</h2>
            <LineChart width={600} height={300} data={chartData || []}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="x"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="y" stroke="#8884d8"/>
            </LineChart>

            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="x"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="y" fill="#8884d8"/>
            </BarChart>

            <RadarChart width={900} height={500} data={chartData}>
                <PolarGrid/>
                <PolarAngleAxis dataKey="x"/>
                <PolarRadiusAxis/>
                <Radar name="Value" dataKey="y" fill="#8884d8" fillOpacity={0.6}/>
            </RadarChart>
        </div>
    );
};

export default Dashboard;
