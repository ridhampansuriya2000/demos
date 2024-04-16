import React, { useEffect, useState } from 'react';
import styles from './Dsahbaord.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import fetchData from '../../../utils/httpAction';

const Dashboard = () => {
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            const yDataResponse = await fetchData({ endPoint: 'o5zMs5/data' });
            const xDataResponse = await fetchData({ endPoint: 'gDa8uC/data' });

            setXData(Object.values(xDataResponse || {}).slice(0, 50));
            setYData(Object.values(yDataResponse || {}).slice(0, 50));
        };

        fetchDataAsync();
    }, []);

    const chartData =React.useMemo(()=>{
        return xData.map((item, index) => ({
            label: `${item.Label}-${yData?.find(elm => elm?.id == item?.id)?.Label || ' '}`,
            y: parseFloat(yData?.find(elm => elm?.id == item?.id)?.RandomNumber || 0),
            x: parseFloat(item.RandomNumber),
        }))
    },[xData,yData]);

    return (
        <div className={styles.mainContainer}>
            <h2>Line Chart</h2>
            <LineChart width={900} height={500} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="y" stroke="#8884d8" />
                <Line dataKey="x" stroke="#82ca9d" />
            </LineChart>

            <h2>Bar Chart</h2>
            <BarChart width={900} height={500} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="y" fill="#8884d8" />
                <Bar dataKey="x" fill="#82ca9d" />
            </BarChart>

            <h2>Radar Chart</h2>
            <RadarChart width={1400} height={700} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <PolarRadiusAxis angle={30} />
                <Radar name="Y" dataKey="y" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="X" dataKey="x" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
        </div>
    );
};

export default Dashboard;
