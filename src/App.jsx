import { useState, useEffect } from 'react';
import {fetchDataFromApi} from "./utils/api";
import { useSelector, useDispatch } from 'react-redux'
//import { getApiConfiguration } from "./store/homeSlice";
import { getApiconfiguration,  getGenres } from './store/homeSlice';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
function App() {
  //we will create useDispatch instance and save in dispatch variable.
  //state is from coming from homeSlice , initial state only.
 const dispatch = useDispatch();
 //destructure url which is from our store
 //inside a useSelector, waha pe ek callback hoga jaha humko hamara store milega
 const { url } = useSelector((state) =>
 state.home);
 console.log(url); //it wil return complete home from homeSlice.js , then put state.home
   useEffect(() => {
    fetchApiConfig();
    genresCall();
   },[])

  // const apiTesting = () => {
  //   fetchDataFromApi('/movie/popular') ///movie/popular-->url endpoint come from API document^ns
  //   .then((res) => {
  //     console.log(res);
  //     dispatch(getApiconfiguration(res))
  //   })
  // }
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration') ///movie/popular-->url endpoint come from API document^ns
    .then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
    };
      dispatch(getApiconfiguration(url))
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};


  return (
  //  <div className="App">
     
  //    {/* will add optional chaining, because initial our url will be empty
  //    and takes some time to call it. */}
  //    {/* {url?.total_pages} */}
  //  </div>
  <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
  );
}


export default App;
