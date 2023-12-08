import React, { useEffect, useState } from 'react';
import '../components/styles/dashboard.css';
import Counter from './Counter';
import Graph from './Graph';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import FileUpload from './FileUpload';
Chart.register(CategoryScale);

const Dashboard = () => {
  const [tripsData, setTripsData] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch trips data from API or generate random data here
    const randomData = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 100)
    );
    setTripsData(randomData);
  }, []);

  return (
    <div className="dashboard">
      <div className="counters">
        <Counter value={50} label="Total Trips" />
        <Counter value={35} label="Completed Trips" />
        <Counter value={15} label="Pending Trips" />
        <Counter value={20} label="Failed Trips" />
        <Counter value={10} label="Cancelled Trips" />
        <Counter value={5} label="Late Trips" />
      </div>
      <Graph data={tripsData} />
    </div>
  );
};

export default Dashboard;
