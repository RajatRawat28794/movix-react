import React from "react";
import { useState, useEffect } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  //after checking in  store , state se home liya, home ke andar h url -> check in redux dev tool
//  url: 
//   backdrop(pin):"https://image.tmdb.org/t/p/original"
// poster(pin):"https://image.tmdb.org/t/p/original"
// profile(pin):"https://image.tmdb.org/t/p/original"
  const { url } = useSelector((state) => state.home);
  //API CALL
  //Initially Data will be null as API success, then data will come
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop +  data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
}, [data]);
  const searchQueryHandler = (event) => {
    //Enter hit karne pe hi API call honi chahiye
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
    }
};
  return (
    <div className="heroBanner">
       {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}
            <div className="opacity-layer"></div>     
        <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
        </div>
        </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
