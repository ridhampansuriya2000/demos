import React, { useEffect, useState } from 'react';
import styles from './Dsahbaord.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import fetchData from '../../../utils/httpAction';

const Dashboard = () => {
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            const yDataResponse = await fetchData({ endPoint: 'o5zMs5/data' });
            const xDataResponse = await fetchData({ endPoint: 'gDa8uC/data' });

            setXData(Object.values(xDataResponse).slice(0, 50));
            setYData(Object.values(yDataResponse).slice(0, 50));
        };

        fetchDataAsync();
    }, []);

    const chartData = xData.map((item, index) => ({
        label: item.Label,
        y: parseFloat(yData[index].RandomNumber),
        x: parseFloat(xData[index].RandomNumber),
    }));

    return (
        <div className={styles.mainContainer}>
            <h2>Line Chart</h2>
            <LineChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="y" stroke="#8884d8" />
                <Line dataKey="x" stroke="#82ca9d" />
            </LineChart>

            <h2>Bar Chart</h2>
            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="y" fill="#8884d8" />
                <Bar dataKey="x" fill="#82ca9d" />
            </BarChart>

            <h2>Radar Chart</h2>
            <RadarChart width={900} height={500} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <PolarRadiusAxis />
                <Radar name="Value" dataKey="y" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Value" dataKey="x" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
        </div>
    );
};

export default Dashboard;
