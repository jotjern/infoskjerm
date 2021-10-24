//import Bus from './components/Bus/Bus';
import BusContainer from './components/Bus/BusContainer';
import './App.css';
import createEnturClient from '@entur/sdk';
import {useState, useEffect} from 'react';


function App() {

  const enturClient = createEnturClient({
    clientName: 'appkom-infoskjerm',
  });

  const [ bus,setBus ] = useState([]);

  useEffect(() => {
    const getGloshaugen=async() => {
      const glos=await fetchBusDepartures();
      setBus(glos);
    };

    getGloshaugen();
  }, []);

  //https://stoppested.entur.org/    NSR:StopPlace:44085 id til gløshaugen
  const fetchBusDepartures = async() => {
    const gloshaugen = await enturClient.getDeparturesFromStopPlace('NSR:StopPlace:44085');
    return gloshaugen;
  };

  console.log(bus);

  return (
    <div className="App">
      <BusContainer></BusContainer>
    </div>
  );
}

export default App;
