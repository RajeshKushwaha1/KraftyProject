import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@material-ui/icons/Search";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";

const NowPlaying = () => {
  const [search, setSearch] = useState("");
  const [movie, setmovie] = useState([]);
  const url1 =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=9f7d1552ee8bc764968cc66c5acf4915&language=en-US&page=1";
  const url = `https://api.themoviedb.org/3/search/movie?api_key=9f7d1552ee8bc764968cc66c5acf4915&language=en-US&page=1&include_adult=false&query=${search}`;

  useEffect(() => {
    if (search === "") {
      const AutoMovie = async () => {
        const res1 = await Axios(url1);
        setmovie(res1.data.results);
      };
      AutoMovie();
    } else {
      const onSearchMovie = async () => {
        const res2 = await Axios(url);
        setmovie(res2.data.results);
      };
      onSearchMovie();
    }
  }, [url, search]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className="container-fluid pt-3 mb-4">
        <div className="row MovieName">
          <div className="col-6 font-bold">Krafty Movies</div>
          <div className="col-6">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={search}
                onChange={handleInput}
                class="form-control"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div className=" NowPlaying">
          {movie &&
            movie.map((el, index) => {
              return (
                <div className="row card-playing" key={index}>
                  <div className="card-img-playing">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                      className="card-img-play"
                      alt="pic"
                    />
                    <div className="mt-0 pt-0 card-body card-body-playing">
                      <div
                        classsName="card-title-playing"
                        style={{ width: "70%" }}
                      >
                        <Link to={`/details/${el.id}`}>{el.title}</Link>
                      </div>
                      <spane className="starvoteplaying">
                        <StarIcon className="Stars" /> {el.vote_average}
                      </spane>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default NowPlaying;
