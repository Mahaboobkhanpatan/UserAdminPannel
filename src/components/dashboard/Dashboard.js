import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [usersData,setUsersData]=useState([]) // state to hold user data
  const [metrics, setMetrics] = useState({ last24: 0, last7: 0, last30: 0 }); // state to hold user metrics
 
  
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsersData(response.data);
      })
      .catch(err => console.log(err));
  }, []);

   // Function to calculate the number of users registered within a specified number of days
  const calculateUsersByDate = (usersData, daysAgo) => {
    const cutoff = new Date();  // Get the current date  that is cut off for calculating the last days 
    cutoff.setDate(cutoff.getDate() - daysAgo);  // Set cutoff date to 'daysAgo' days before today
    return usersData.filter(user => new Date(user.createdAt) >= cutoff).length; // Filter users based on creation date
  };

   // Calculate metrics whenever usersData changes
  useEffect(() => {
    setMetrics({
      last24: calculateUsersByDate(usersData, 1),
      last7: calculateUsersByDate(usersData, 7),
      last30: calculateUsersByDate(usersData, 30),
    });
  }, [usersData]);

  // Chart data configuration
  const data = {
    labels: ['Last 24 hours', 'Last 7 days', 'Last 30 days'], // Labels for the x-axis
    datasets: [{
      label: 'User Registrations', // Label for the dataset
      data: [metrics.last24, metrics.last7, metrics.last30], // Data points for the chart
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for the chart
      borderColor: 'rgba(75, 192, 192, 1)', // Border color for the chart
      borderWidth: 1, // Width of the chart border
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Makes chart take full width/height of the container
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // Increase font size of legend
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 14, // Increase font size of tooltips
        },
        titleFont: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // Increase font size for x-axis labels
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14, // Increase font size for y-axis labels
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20, // Add some padding to make the chart more readable
        bottom: 20,
      },
    },
  };

   // Render the Line chart with the configured data and options
  return <Line data={data} options={options}/>;
};

export default AnalyticsDashboard;
