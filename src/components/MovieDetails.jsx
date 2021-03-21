import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Axios from "axios";

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
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
   
    
    return( 
        <div className="movie-details-section">
            {
                movie &&(<>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} style={{width:"100%",height:"700px"}} alt="img"/>
                    <h1 className="text-center">{movie.original_title}</h1>
                    <span className="ml-2">{movie.vote_average}</span>
                    <p className="ml-2">{movie.genres.map((genre)=>{
                        return(
                           <span>{`${genre.name}, `}</span>
                        );
                    })}</p>
                    <h6 className="ml-2">Info</h6>
                    <hr style={{height:"2px",width:"50px",color:"red",marginTop:"-5px"}}></hr>
                    <p className="ml-2">{movie.overview}</p>
                    <h6 className="ml-2">Cast</h6>
                    <hr style={{height:"2px",width:"50px",color:"red",marginTop:"-5px"}}></hr>
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
