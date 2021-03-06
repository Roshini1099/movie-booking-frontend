import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Register";
import Login from "./components/Login";
import {Navigationbar} from './components/Navigationbar';
import Booking from './components/Booking';
import Admin from './components/Admin';
import Cards from './components/cards/Cards';
import Grid from './components/Grid';
import "./App.css";
import form from './components/Form';
//import MoviesList from './components/MovieList/MovieList';
class App extends Component{
  render()
  {
    return(
      <div className="App">
        <Navigationbar/>
        
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/booking" component={Booking}/>
            <Route exact path="/seat" component={Grid}/>
            <Route exact path="/movies" component={Cards}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/form" component={form}/>
          </Switch>  
       </BrowserRouter>

      </div>
      
    );
  }


}
export default App;
