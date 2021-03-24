import React, {useState, useEffect} from 'react';
import {useParams, useHistory, Link} from "react-router-dom";
import Axios from "axios";
import StarIcon from '@material-ui/icons/Star';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const MovieDetails = () => {
    const {id} = useParams();
    const history = useHistory();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [bookmark, setBookmark] = useState(false);
    const [videoId, setVideoId] = useState('');
    useEffect(() => {

      const res =  Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9f7d1552ee8bc764968cc66c5acf4915&language=en-US`);
      const castRes=Axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=9f7d1552ee8bc764968cc66c5acf4915&language=en-US`);
      castRes.then(casts=>{
          console.log("my cast",casts.data.cast);
          setCast(casts.data.cast);
      })
      res.then(body =>{
          console.log(body);
            setMovie(body.data);
      });
    }, []) //eslint-disable-line
    useEffect(()=>{
        const res = Axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9f7d1552ee8bc764968cc66c5acf4915&language=en-US`);
        res.then(body=>{
            setVideoId(body.data.results[0].key);
        }).catch(err=>console.log(err.message));
    },[]) //eslint-disable-line
    
    return( 
        <div className="movie-details-section">
            {
                movie &&(<>
                    <div className="col-2 Bookmark">
                <i className={bookmark ? "fas fa-bookmark" : "far fa-bookmark"} onClick={(e) => setBookmark(!bookmark)} ></i>
         
            </div>
            <i onClick={e=>{history.goBack()}} class="fas fa-arrow-left backbutton"></i>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} style={{width:"100%",height:"700px"}} alt="img"/>
                  
                    <h6>{movie.original_title}</h6>
                    <span className="starvote">
                    <StarIcon className="Stars"/>
                    {movie.vote_average}</span>
                    <p className="ml-2">{movie.genres.map((genre, index)=>{
                        const len = movie.genres.length - 1;
                        return(
                           <span className="genre">{`${genre.name}`}{ len === index ?'': ", "}</span>
                        );
                    })}</p>
                    <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blanck"><button className="btn">Play Trailer<PlayCircleOutlineIcon className="playbutton"/></button></a>
                    <h6 className="ml-2 ">Info</h6>
                    <div className="cast"></div>
                    <p className="ml-2">{movie.overview}</p>
                    <h6 className="ml-2 ">Cast</h6>
                    <div className="cast"></div>
                    <div className="row">
                        {cast.map((el,index)=>{
                            return(
                                <div className="card m-1 p-1" style={{width:"8rem"}}>
                              <img src={`https://image.tmdb.org/t/p/w500/${el.profile_path}`} style={{width:"7rem",height:"7rem"}} alt="pic" />
                             <p className="text-center">{el.name}</p>
                             </div>
                            );
                        })}
                    </div>
                    </>)
            }
        </div>
    );
}

export default MovieDetails
