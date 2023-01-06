import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState([])
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState('');

  const url = 'http://localhost:30357/onelineaddress?address=';

  const searchLocation = (event) => {
    if (location && event.type === 'click') {
      setLoading(true);
      axios.get(url + location).then((response) => {
        setLoading(false);
        setResponse(true);
        setError('');
        setData(response?.data);
      })
        .catch((error) => {
          setLoading(false);
          setResponse(false);
          setError(error?.response?.data?.message);
          setData([]);
        })
    }
    event.preventDefault();
  }

  const imgStyle = {
    height: '86px',
    width: '86px',
  };

  return (
    <div className="App container-fluid">
      <h1>Weather Forecast</h1>
      <form onClick={searchLocation} className="d-flex flex-row justify-content-center m-2">
        <input className="form-control m-2" value={location} onChange={event => setLocation(event.target.value)} placeholder="Address" type="text" />
        <button type="submit" className="btn btn-primary m-2">Submit</button>
      </form>
      {!loading && !error && !response ? <p>Enter Address to get seven day forecast</p> : ''}
      {loading ? <div className="spinner-border" role="status"></div> : ''}
      {error ? <p>{error}</p> : ''}
      <div className="card-deck">
        {!loading && response ? data.map((weather, idx) => (
          <div key={idx} className="card p-2">
            <div className="card-header">{weather.name}</div>
            <div className="card-body d-flex flex-row align-items-center">
              <img className="card-img" src={weather.icon} alt="weather" style={imgStyle} />
              <p className="card-text px-2">{weather.detailedForecast}</p>
            </div>
          </div>
        )) : ''}
      </div>
    </div>
  );
}

export default App;
