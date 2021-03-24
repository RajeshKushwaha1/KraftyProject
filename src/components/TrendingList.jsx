import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import StarIcon from '@material-ui/icons/Star';
import { Link } from "react-router-dom";

const TreandingMovie = () => {

  const [treanding, setTreanding] = useState([]);
  

  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=9f7d1552ee8bc764968cc66c5acf4915&language=en-US&page=1=${treanding}`;


  useEffect(() => {
    const treandingMovie=async()=>{
            const response= await Axios(url);
            setTreanding(response.data.results)
                
    }
     
    treandingMovie()
  }, [url])


    return (
        <>
        <div className="row-6" style={{height:"40%"}}>
          <div className="row TredingMovie">
          <h2 className="center font-bold ml-3 mt-2 mb-2">Trending</h2>
          
          <div className="row-8">
                  <ul style={{listStyleType: "none"}}>
        {
            treanding && treanding.map((el,index)=>{
                return(   
                  <MovieCard key={index} id={el.id} src={el.poster_path} title={el.title} vote={el.vote_average}  />
                 )
             })
        }
                  </ul>  
        </div>
       </div> 
       </div>
        </>
    )
}

export default TreandingMovie;

const MovieCard=({src,title,vote,id})=>{
    const[bookmark,setBookmark]=useState(false);
    const [runtime, setRuntime] = useState('');
  const [genres, setGenres] = useState([]);
  useEffect(()=>{
    Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9f7d1552ee8bc764968cc66c5acf4915&language=en-US`).then(res=>{

      setRuntime(res.data.runtime);
      setGenres(res.data.genres);
    }).catch(err=>console.error(err.message));
  }, []) //eslint-disable-line react-hooks/exhaustive-deps
    return(
        <li className="mb-3">            
                <div className="row card-trending toHide">
                <img src={`https://image.tmdb.org/t/p/w500/${src}`}  className="col-4 card-img-trending" alt="pic" />
                     <div className="col-6 card-body-trending">
                        <h5 className="card-title-trending"><Link to={`/details/${id}`}>{title}</Link></h5>
                        <p className="runtimes">{`${Math.trunc(runtime/60)}h  ${runtime%60}m`}</p>
          <p >{genres.map((item, index)=>{
            const len = genres.length -1;
            return <span className="runtime">{item.name}{len === index ? "": ", "}</span>
          })}</p>
                        <p className="card-rating-trending"><StarIcon className="Stars"/> {vote}</p>
                     </div>
                     <div className="col-2"><i className={bookmark?"fas fa-bookmark red-bookmark":"far fa-bookmark"} onClick={(e)=>setBookmark(!bookmark)}></i></div>
                </div>
                </li>
    )
}