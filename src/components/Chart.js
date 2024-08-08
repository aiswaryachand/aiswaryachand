import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  registerables
} from "chart.js";

// Register the necessary components
ChartJS.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ...registerables
);
  
  // Define the options object
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recipe vs cooking time'
      }
    }
  };
  
  
  // Define the data object
const data = {
  
    labels: ['Cucumber Salad Sandwich', 'Chicken Caprese Salad', 'Honey-Garlic Chicken Casserole ', 'Green Goddess Salad with Chickpeas', 
      'Anti-Inflammatory Beet & Avocado Wrap', 'Roasted Salmon with Smoky Chickpeas & Greens','Egg, Spinach & Cheddar Breakfast Sandwich'],
    datasets: [
      {
        label: "cooking Time",
        data: [10, 33, 45, 15, 15, 10, 10],
        backgroundColor: "rgba(255,99,132,0.5)"
      }     
    ]
  };

export  function Chart() {
      //  <div style ={{width:100,height:100}}>
        return (<Bar data={data} options={options} />); 
        // </div> 
}

