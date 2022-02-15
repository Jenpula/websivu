import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

const URL = 'https://api.covid19api.com';

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const criteria = 'country/finland?from=2022-01-01T00:00:00Z&to=2022-02-14T00:00:00Z'
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
        <div className="text-center">
        <h1>Koronavirustapaukset Suomessa</h1>
          {items.map(item => (
              <div key={item.Date}>
                <h3>Päivämäärä</h3>
                <p>{item.Date}</p>
                <h4>Vahvistetut koronavirus tartunnat</h4>
                <p>{item.Confirmed}</p>
                <h4>Aktiiviset tartunnat</h4>
                <p>{item.Active}</p>
                <h4>Kuolleiden määrä</h4>
                <p>{item.Deaths}</p>
                <hr></hr>
              </div>
            ))
          }
        </div>
    );
  }

}

export default App;
