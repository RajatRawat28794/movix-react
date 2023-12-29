import { useState, useEffect } from 'react';
import {fetchDataFromApi} from "./utils/api";
function App() {
 
   useEffect(() => {
    apiTesting();
   },[])

  const apiTesting = () => {
    fetchDataFromApi('/movie/popular') ///movie/popular-->url endpoint come from API document^ns
    .then((res) => {
      console.log(res);
    })
  }
  return (
   <div className="App">
     APP
   </div>
  )
}

export default App
