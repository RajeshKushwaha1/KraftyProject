// import React,{useState,useEffect} from "react";
// import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
// import SearchIcon from "@material-ui/icons/Search";
// import Axios from "axios";

// const Majar = () => {

//     const [movieName, setMovieName] = useState("");
//     const [trandMovieArr, setTrandMovieArr] = useState([]);
//     const [movies, setMovies] = useState(Sdata);
    
//     const url = `http://www.o/mdbapi.com/?i=tt3896198&apikey=bb527392&s=${movieName}`;
//     let tranding=" https://api.themoviedb.org/3/trending/all/day?api_key=9f7d1552ee8bc764968cc66c5acf4915";


//     useEffect(()=>{
//         const searchMovie=async()=>{
//             const response= await Axios(tranding);
//             console.log(response.data.results);
//             setTrandMovieArr(response.data.results);
//         }    
//         searchMovie();
//     },[])
    
//     const handleSearch = (e) => {
//         setMovieName(e.target.value);
//         console.log(setMovieName);
//     };

//   return (
//     <>
//       <div className="row">
//         <h1>Movies</h1>
//       </div>
//       <div className="row">
//         <SearchIcon />
//         <span>Search</span>
//         <input type="text" className=" form-control" placeholder="Search" value={movieName}></input>
//       </div>
//       <div className="row">  
//         {
//             trandMovieArr.map((el,index)=>{
//                 return(
//                     <div className="card" style={{ width: "18rem" }} key={index}>
//                 <img src="el.poster_path" className="card-img-top" alt="pic" />
//           <div className="card-body">
//             <h5 className="card-title">{el.original_title}</h5>
//             <p className="card-text"> title</p>
//           </div>
//         </div>
//                 )
//             })
//         }
//       </div>
//     </>
//   );
// };

// export default Majar;
