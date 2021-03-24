import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
const TreandingMovie = () => {
  const [treanding, setTreanding] = useState([]);

  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=9f7d1552ee8bc764968cc66c5acf4915${treanding}`;

  useEffect(() => {
    const treandingMovie = async () => {
      const response = await Axios(url);
      setTreanding(response.data.results);
    };

    treandingMovie();
  }, [url]);

  useEffect(() => {});

  return (
    <>
      <div className="row TrendingMovie mb-4">
        <div className="col-6 trending-heading">
          <p className="ml-3 font-bold">Trending</p>
        </div>
        <div className="col-6 font-bold" id="view-all">
          <Link to="/trending/all" className="View_All">
            View All
          </Link>
        </div>
      </div>

      <div className="row">
        <ul className="ulStyle">
          {treanding &&
            treanding.map((el, index) => {
              return (
                <MovieCard
                id={el.id}
                  index={index}
                  title={el.title}
                  vote={el.vote_average}
                  imgSrc={el.poster_path}
                />
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default TreandingMovie;

const MovieCard = ({ index, imgSrc, title, vote, id }) => { 
  const [bookmark, setBookmark] = useState(false);
  const [runtime, setRuntime] = useState('');
  const [genres, setGenres] = useState([]);
  useEffect(()=>{
    Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9f7d1552ee8bc764968cc66c5acf4915&language=en-US`).then(res=>{

      setRuntime(res.data.runtime);
      setGenres(res.data.genres);
    }).catch(err=>console.error(err.message));
  }, []) //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <li className="mb-2">
      <div className="row card-trending toHide ml-3" key={index}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}
          className="col-4 card-img-trending"
          alt="pic"
        />
        <div className="col-6 card-body-trending">
        
          <h6 className="card-title-trending"><Link to={`/details/${id}`}>{title}</Link></h6>
          <p className="runtimes">{`${Math.trunc(runtime/60)}h  ${runtime%60}m`}</p>
         
          <p >{genres.map((item, index)=>{
            const len = genres.length -1;
            return <span className="runtime">{item.name}{len === index ? "": ", "}</span>
          })}</p>
          <p className="card-rating-trending" style={{marginTop:"-1px"}}>
            <StarIcon className="Stars" /> {vote}
          </p>
        </div>

        <div className="col-2 Heart">
          <i
            className={bookmark ? "fas fa-bookmark" : "far fa-bookmark"}
            onClick={(e) => setBookmark(!bookmark)}
          ></i>
        </div>
      </div>
    </li>
  );
};
