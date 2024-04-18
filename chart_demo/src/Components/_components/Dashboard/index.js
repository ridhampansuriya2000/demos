import React, { useEffect, useState } from 'react';
import styles from './Dsahbaord.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import fetchData from '../../../utils/httpAction';
import {convertAndFix} from "../../../utils/helpers";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.customTooltip}>
                <p className="label">{`x,y`}</p>
                <p className={styles.intro}>{`${convertAndFix(payload?.[0]?.payload?.y)}-${convertAndFix(payload?.[0]?.payload?.x)}`}</p>
            </div>
        );
    }

    return null;
};

const Dashboard = () => {
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            const yDataResponse = await fetchData({ endPoint: 'o5zMs5/data' });
            const xDataResponse = await fetchData({ endPoint: 'gDa8uC/data' });

            setXData(Object.values(xDataResponse || {}));
            setYData(Object.values(yDataResponse || {}));
        };

        fetchDataAsync();
    }, []);

    const chartData =React.useMemo(()=>{
        // return xData.map((item, index) => ({
        //     label: `${item.Label}-${yData?.find(elm => elm?.id == item?.id)?.Label || ' '}`,
        //     y: parseFloat(yData?.find(elm => elm?.id == item?.id)?.RandomNumber || 0),
        //     x: parseFloat(item.RandomNumber),
        // }))?.slice(0, 50)
        const newArr = xData?.sort((a,b)=> parseInt(a?.RandomNumber) - parseInt(b?.RandomNumber));
        return newArr.map((item, index) => ({
            label: convertAndFix(item.RandomNumber),
            y: parseFloat(item.RandomNumber),
            x: parseFloat(yData?.find(elm => elm?.id == item?.id)?.RandomNumber || 0),
        })).slice(0, 50);
    },[xData,yData]);

    return (
        <div className={styles.mainContainer}>
            <h2>Line Chart</h2>
            <LineChart width={900} height={500} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" interval={1} angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line dataKey="x" stroke="#82ca9d" />
            </LineChart>

            <h2>Bar Chart</h2>
            <BarChart width={900} height={500} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" interval={1} angle={-45} textAnchor="end"  />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="x" fill="#82ca9d" />
            </BarChart>

            <h2>Radar Chart</h2>
            <RadarChart width={1400} height={700} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" interval={1} angle={-45} textAnchor="end"  />
                <PolarRadiusAxis angle={30} />
                <Tooltip content={<CustomTooltip />} />
                <Radar name="X" dataKey="x" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
        </div>
    );
};

export default Dashboard;
