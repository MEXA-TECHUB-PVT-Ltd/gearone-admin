import { Chart } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { useEffect, useState, useRef } from 'react'
import url from '../url';
​
function Workoutplangraph() {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState("");
    const [intermediate, setIntermediate] = useState("");
    const [advancecount, setAdvancecount] = useState("");
​
    useEffect(() => {
        // Fetch data from API
       
        var InsertAPIURL = `${url}workout_plan/get_for_intermediate`
         fetch(InsertAPIURL, {
            method: 'GET',
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(response => {
                console.log("plans")
​
                console.log(response.result.length)
​
​
                setChartData(response.result.length);
            }
            )
            .catch(error => {
​
                alert(error);
            });
​
        //intermediate
        var InsertAPIURL = `${url}workout_plan/get_for_beginners`
         fetch(InsertAPIURL, {
            method: 'GET',
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(response => {
                console.log("intermediate")
​
                console.log(response.result.length)
​
​
                setIntermediate(response.result.length);
            }
            )
            .catch(error => {
​
                alert(error);
            });
​
        //Advance
        var InsertAPIURL = `${url}workout_plan/get_for_advance`
         fetch(InsertAPIURL, {
            method: 'GET',
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(response => {
                console.log("advance")
​
                console.log(response.result.length)
​
​
                setAdvancecount(response.result.length);
            }
            )
            .catch(error => {
​
                alert(error);
            });
    
    }, []);
​
    // useEffect(() => {
    //     // Create the chart instance
    //     const ctx = chartRef.current.getContext('2d');
    //     const chart = new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: ['Beginner', 'Intermediate', 'Advance'],
    //             datasets: [
    //                 {
    //                     label: 'Workout plan types',
    //                     data: [chartData, intermediate, advancecount],
    //                     backgroundColor: '#f5bf9a',
    //                     borderColor: '#B5030B',
    //                     borderWidth: 1,
    //                 },
    //             ],
    //         },
    //         options: {
    //             scales: {
    //                 y: {
    //                     beginAtZero: true,
    //                 },
    //             },
    //         },
    //     });
​
    //     // Cleanup the chart instance on unmount
    //     return () => {
    //         chart.destroy();
    //     };
    // }, [chartData]);
​
    const data = {
        labels: ['Beginner', 'Intermediate', 'Advance'],
        datasets: [
          {
            data: [chartData, intermediate, advancecount],
            backgroundColor: ['#0A1637', 'white0E', '#FF5100'],
          },
        ],
      };
​
    return   <Pie data={data} />;
    // <canvas ref={chartRef} />;
}
​
export default Workoutplangraph