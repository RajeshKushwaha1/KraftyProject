import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import  NowPlaying from "./NowPlaying"; 
import  TreandingMovie from "./TreandingMovie";
import  MovieDetails from "./MovieDetails";
import  TrendingList from "./TrendingList";


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact >
                
                    <NowPlaying/>
                    <TreandingMovie/>
               
                </Route>
                <Route path="/details/:id">
                <MovieDetails/>
                </Route>
                <Route path="/trending/all/" component={TrendingList}/>
                
            </Switch>
        </BrowserRouter>
    );
}

export default App;
