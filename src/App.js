import './App.css';
import jsonData from './assets/currencies.json';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import MySelectOption from './components/MySelectOption';
// import MyCustomInput from './components/MyCustomInput';
import CurrencyInput from './components/CurrencyInput';

export default function App() {
  var date = new Date().toISOString().split('T')[0].split('-');
  let today = date[0] + "-" + date[1] + "-" + date[2]

  const currencyCodeData = JSON.parse(JSON.stringify(jsonData)) 
  const [rate, setRate] = useState(0)
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(rate)
  const [currency1, setCurrency1] = useState('usd')
  const [currency2, setCurrency2] = useState('inr')
  
  var currencyCodeArr = Object.keys(currencyCodeData)
  
  useEffect(()=>{
    axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1.toString()}/${currency2.toString()}.json`)
    .then(res=>setRate(res.data[currency2.toString()].toFixed(2)))
  }, [currency1, currency2])

  console.log(rate)

  const handleAmount1Change = (e)=>{
    setAmount2(((e.target.value)*rate).toFixed(2))
    setAmount1((e.target.value))
  }
  const handleCurrency1Change =  (e)=>{
    setAmount2((amount1*rate).toFixed(2))
    setCurrency1(e.target.value)
  }
  const handleAmount2Change = (e)=>{
    setAmount1(((e.target.value)/rate).toFixed(2))
    setAmount2(e.target.value)
  }
  const handleCurrency2Change =  (e)=>{
    setAmount1((amount2/rate).toFixed(2))
    setCurrency2(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exchange Rates</h1>
        <h3>{today}</h3>
      </header>
      <section className="App-body">
        
        <CurrencyInput 
        amount={amount1}
        currency={currency1}
        currencyArr={currencyCodeArr}
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        />
        <CurrencyInput 
        amount={amount2}
        currency={currency2}
        currencyArr={currencyCodeArr}
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        />
        
      </section>
    </div>
  );
}
