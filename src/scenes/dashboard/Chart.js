import { Chart } from 'chart.js';
import React, { useEffect, useState, useRef } from 'react'
import url from '../url';

function Graph() {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({ labels: [], counts: [] });

    useEffect(() => {
        // Fetch data from API
        const year = '2023';
        const fetchData = async () => {
            var InsertAPIURL = `${url}auth/get_monthwise_users`
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              };          
              var Data = {
                "year": year,
              };          
            await fetch(InsertAPIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(response => {
                    console.log("response.result")

                    console.log(response.result)
                    let arrayDummy=response.result
                    const month = response.result.map(entry => entry.month);
                    const counts = response.result.map(entry => entry.count);
                    const year = response.result.map(entry => '2023');
                    // console.log("Graph", month, counts, year)
                    // console.log( counts)
                    // console.log( year)
                    // console.log( month)
                    // const YearData='2023'
                 
                    let ArrayData=[]
                    //    for (let i = 0; i < arrayDummy.length; i++) {
                        const filteredRecords = arrayDummy.filter(record => '2023' === '2023');
                        console.log("filteredRecords")
                        console.log(filteredRecords)
                    //    }
                        for (let i = 0; i < filteredRecords.length; i++) {
                            for(let j=1;j<13;j++){
                                const formattedIteration = j.toString().padStart(2, '0');
                                if(filteredRecords[i].month==formattedIteration){
                                    ArrayData.push(filteredRecords[i].count)
                                }else{
                                    ArrayData.push(0)
                                }
                
                            }
                        }
                        console.log('ArrayData')
                        console.log(ArrayData)

                    setChartData(ArrayData);
                }
                )
                .catch(error => {
                    console.log(error);
                    // alert(error);
                });
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Create the chart instance
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels:  ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
                datasets: [
                    {
                        label: 'Users',
                        data: chartData,
                        backgroundColor: '#f5bf9a',
                        borderColor: '#B5030B', 
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Cleanup the chart instance on unmount
        return () => {
            chart.destroy();
        };
    }, [chartData]);

    return <canvas ref={chartRef} />;
};


export default Graph