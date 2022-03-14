import React, { useState, useEffect } from "react";
import axios from 'axios'
import './ConvertForm.css'

export default function ConvertForm(){
    const url = 'http://data.fixer.io/api/'
    const access_key = '2fe0ad1d7c24d0016498ef8ec7b86137'
    const [symbols,setSymbols] = useState({});
    let [from, setFrom ] = useState('');
    let [to,setTo] = useState('');
    let [amount, setAmount] = useState(1)
    let [result, setResult] = useState(null);

    useEffect(() => {
        getSymbols();
    }, [])

    function getSymbols(){
        axios.get(`${url}symbols?access_key=${access_key}`)
        .then(res => {
          if ( res.status === 200 ){
            setSymbols(res.data?.symbols);
          }
        })
    }

    function getConvert(){
        axios.get(`${url}convert?access_key=${access_key}&from=${from}&to=${to}&amount=${amount}`)
        .then(res => {
            if(res.data?.success){
                setResult(res.data?.result);
            }
        })
    }

    function handleFromSelect(e){
        setFrom(e.target.value)
    }

    function handleToSelect(e){
        setTo(e.target.value)
    }

    function handleAmountInput(e){
        setAmount(e.target.value)
    }

    return(
    <>
        <form className="convert-form" onSubmit={(e) => {e.preventDefault()}}>
            <div>
                <label>From:</label>
                <select onChange={handleFromSelect}>
                    {Object.keys(symbols).map((symbol) => {
                        return <option key={symbol}>{symbol}</option>})}
                </select>
            </div>
            <div>
            <label>To:</label>
                <select onChange={handleToSelect}>
                    {Object.keys(symbols).map((symbol) => {
                        return <option key={symbol}>{symbol}</option>})}
                </select>
            </div>
            <div>
                <label>Amount:</label>
                <input type="number" min={1} value={1} onChange={handleAmountInput} />
            </div>
            <div>
                <button onClick={getConvert} className='button-form'>Calculate</button>
            </div>            
        </form>
        {result && (
            <div className="convert-result">
                <p>{`El resultado es: ${result}`}</p>                    
            </div>
        )}
    </>
    )
}