import React, { useState } from "react";
import axios from 'axios';
import {  Line, XAxis, YAxis, Legend, Tooltip, LineChart, CartesianGrid } from 'recharts';
import './plotForm.css'


export default  function PlotForm(){
    const url = 'http://data.fixer.io/api/'
    const access_key = '2fe0ad1d7c24d0016498ef8ec7b86137'
    let [dates,setDates] = useState([]);
    let [dummy,setDummy] = useState([]);


    function getHistoricalRates(date){
        axios.get(`${url}${date}?access_key=${access_key}&symbols=${'CAD,USD,GBP,AUD'}`)
        .then(res => {
            let newArray = []
            let newObject = { ...res.data.rates  }
            newObject.date = res.data.date
            newArray = dummy
            newArray.push(newObject)
            setDummy([...newArray]);
        })
    }

    function handleDatePicker(e){
        const value = e.target.value
        setDates([...dates, value])
    }

    function handlePlot(){
        if(dates.length > 0) {
            dates.map(date => {
                return getHistoricalRates(date);
            })
        } else {
            console.log('Seleccione fecha')
        }
    }

    function handleClean(){
        setDates([]);
        setDummy([]);
    }

    return(
        <div className="plotForm-container">
            <div className="rates-header">
                <div>
                    <h4>Indicate 4 dates:</h4>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type={"date"} onChange={handleDatePicker} />
                        <div>
                            <button onClick={handlePlot} className='button-form-plot'>Plot</button>
                            <button onClick={handleClean} className='button-form-transparent'>Clean</button>
                        </div>
                    </form>
                </div>
                {dates.length > 0 && 
                    <div>
                        <h4>Dates selected</h4>
                        {dates.map((date, index) => {
                            return <p key={index}>{date}</p>
                        })}
                    </div>
                }
            </div>
            <div className="plot-container">
                <LineChart width={600} height={300} data={dummy}>
                <XAxis dataKey="date" angle={30} tick={{stroke: '#000080', strokeWidth: 0.5}} label={"Fecha"} />
                <YAxis />
                <CartesianGrid strokeDasharray="4 1 2" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="AUD" stroke="#8884d8" />
                <Line type="monotoneX" dataKey="CAD" stroke="#ffa333" />
                <Line type="monotoneY" dataKey="USD" stroke="#8bc34a" />
                <Line type="linear" dataKey="GBP" stroke="red" />
                </LineChart>
            </div>
        </div>
            
    )
}