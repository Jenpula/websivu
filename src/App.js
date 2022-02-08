import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';


const URL = 'https://api.covid19api.com';
//const API_KEY = '64df85b3494449a2916f1d16bbda7dba';

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const criteria = 'live/country/finland/status/confirmed/date/2022-02-07T00:00:00Z';
    const address = URL + '/' + criteria;

    axios.get(address)
    .then((response) => {
      setItems(response.data);
      console.log(response)
      setIsLoaded(true);
    }).catch(error => {
      setError(error);
     

    });

  }, []);




  if(error) {
    return <p>{error.message}</p>;
  }else if (!isLoaded) { //'isloaded === false' on sama asia mutta ! edessä tarkoittaa myös ei.
    return <p>Loading...</p>
  }
  else {
    return (
      <div>
        <h1>Koronavirus tapaukset</h1>
        <div>
          {
            items.map(item => (
              <div key={item.Active}>
                <h4>Vahvistetut koronavirus tartunnat</h4>
                <p>{item.Confirmed}</p>
                <h4>Kuolleiden määrä</h4>
                <p>{item.Deaths}</p>
                <h4>Päivämäärä</h4>
                <p>{item.Date}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

}

export default App;
