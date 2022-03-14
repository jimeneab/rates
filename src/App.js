import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/navbar/Navbar';
import ConvertForm from './components/convertForm/ConvertForm';
import PlotForm from './components/plotForm/plotForm';
import { AlertTriangle, Archive, Battery, ArrowDownCircle, Facebook, Instagram, Twitter } from 'react-feather';

function App() {
  const url = 'http://data.fixer.io/api/'
  const access_key = '2fe0ad1d7c24d0016498ef8ec7b86137'
  let [tabState, setTabState] = useState(1);
  let [date, setDate] = useState(null);
  let [rates,setRates] = useState([]);
  const services = [{name: 'Convert Service', icon: <AlertTriangle size={50} color='#8787fb' />, description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."},{name: 'History Rates', icon: <Archive size={50} color='#8787fb' />, description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."},{name: 'Latest Rates', icon: <Battery size={50} color='#8787fb'/>, description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."}]
 

  useEffect(()=>{
    getRates();
  },[])

  function getRates(){
    axios.get(`${url}latest?access_key=${access_key}&symbols=MXN,USD,CAD,AUD,CHF,CNY,GBP,JPY`)
    .then(res => {
      if(res.data?.success){
        setDate(res.data.date);
        setRates(Object.entries(res.data.rates))
      }
    })
  }
  
  return (
    <div className="App">
      <header>
      <Navbar></Navbar>
      </header>
      <section className='hero-section'>
        <h1>See your rates!</h1>
        <ArrowDownCircle size={50} color='white' />
      </section>
      <section>
        <article className='main-card'>
          <div className='tab-component'>
            <button className={tabState === 1 ? 'active' : null} onClick={() => setTabState(1)} >Convert</button>
            <button className={tabState === 0 ? 'active' : null} onClick={() => setTabState(0)}>Rates</button>
          </div>
          <div>
            {tabState === 1 ? <ConvertForm /> : <PlotForm />}
          </div>
        </article>
      </section>
      <section className="content-section">
        <div>
          <h3>Latest rates</h3>
          <h4>{`Base: EUR`}</h4>
        </div>
        <div>
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>CURRENCY</th>
              <th>RATE</th>
            </tr>
          </thead>
          <tbody>
            {rates.map(([key,value]) => {
              return(
                <tr key={key}>
                  <td>{date}</td>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </section>
      <section className='services-section'>
        {services.map((service, index) => {
          return(
            <div className='service-card' key={index}>
              <span>{service.icon}</span>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
            <button className='service-button'>Ver mas!</button>
        </div>
          )
        })}
      </section>
      <footer>
        <div>
          <h4>Thanks for visit our site</h4>
        </div>
        <div>
          <h4>Follow us:</h4>
          <Facebook />
          <Instagram />
          <Twitter />
        </div>
      </footer>
      {/* <section className='Sidebar'>
      <h6>Elige las divisas a mostrar</h6>
      <div className='check-wrapper'>
        {Object.keys(symbols).map((symbol, index)=> {
            return(
            <div className='check-item' key={index}>
                <input type={'checkbox'} />
                <label>{symbol}</label>  
            </div>)
          })} 
      </div>
      </section> */}
    </div>
  );
}

export default App;
