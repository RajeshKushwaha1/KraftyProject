import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import {Link} from "react-router-dom";

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

  useEffect(()=>{

  })

    return (
        <>
              <div className="row TrendingMovie mb-4">
               <div className="col-6 trending-heading">
               <p className="ml-3 font-bold">Trending</p>
               </div>
               <div className="col-6 font-bold" id="view-all"><Link to="/trending/all">View all</Link></div>
              </div>

          <div className="row">
                  <ul className="ulStyle">
        {
            treanding && treanding.map((el,index)=>{
                return(   
                  <MovieCard index={index} title={el.title} vote={el.vote_average} imgSrc={el.poster_path} />
                 )
             })
        }
                  </ul>  
        </div>
        </>
    )
}

export default TreandingMovie;

const MovieCard = ({index, imgSrc, title, vote})=>{
  const [bookmark, setBookmark] = useState(false);
  return (
    <li className="mb-2">            
    <div className="row card-trending toHide ml-3"  key={index}>
    <img src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}  className="col-4 card-img-trending" alt="pic" />
         <div className="col-6 card-body-trending">
            <h5 className="card-title-trending">{title}</h5>
            <p className="card-rating-trending"> {vote}</p>
         </div>
         <div className="col-2 Heart"><i className={bookmark?"fas fa-bookmark":"far fa-bookmark"} onClick={(e)=>setBookmark(!bookmark)}></i></div>
    </div>
    </li>
  )
}