import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
// API
const URL = 'https://api.covid19api.com';

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredData,setFilteredData] = useState(items);

// SEARCHBAR
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = items.filter((data) => {
      return data.Date.search(value) !== -1;

    });
    setFilteredData(result);
  }

  // API
  useEffect(() => {
    const criteria = 'country/finland?from=2022-01-01T00:00:00Z&to=2022-02-14T00:00:00Z'
    const address = URL + '/' + criteria;

    axios.get(address)
    .then((response) => {
      setItems(response.data);
      setFilteredData(response.data);
      console.log(response)
      setIsLoaded(true);
    }).catch(error => {
      setError(error);
     
    });
    
  }, []);
  // IF ERROR, PAGE GIVES ERROR MESSAGE, OTHERWISE FIRST IT LOADS AND THEN SHOWS INFORMATION.
  if(error) {
    return <p>{error.message}</p>;
  }else if (!isLoaded) {
    return <p>Loading...</p>
  }
  else {
    // GETTING INFORMATION FROM API
    return (  
        <div className="text-center">
        <h1>Koronavirustapaukset Suomessa</h1>
        <label>Etsi päivämäärän mukaan</label>
        <input type="text" onChange={(event) => handleSearch(event)} />
          {filteredData.map(items => (
              <div key={items.Date}>
                <h3>Päivämäärä</h3>
                <p>{items.Date}</p>
                <h4>Vahvistetut koronavirus tartunnat</h4>
                <p>{items.Confirmed}</p>
                <h4>Aktiiviset tartunnat</h4>
                <p>{items.Active}</p>
                <h4>Kuolleiden määrä</h4>
                <p>{items.Deaths}</p>
                <hr></hr>
              </div>
            ))
          }
        </div>
    );
  }

}

export default App;
