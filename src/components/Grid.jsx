import React, { Component } from 'react';
import Seat from './Seat'
import axios from 'axios';
import uuid from "uuid";
import Modal from "./Modal/index";


import ErrorView from './ErrorView';

class Grid extends Component {
  constructor(){
    super();
    this.sessionId = uuid.v4();
  }

  state = {
      rows : [],
      data:[{username:'',email:''}],
      show:false,
      booked:false,
      showError : ``
  }

  //API calls

 //async call to get data from the server
  loadAvailableSeatsFromServer = ()=>{
    return new Promise(resolve=>{
        axios.get('https://movie-ticket-booking-backend.herokuapp.com/api/currentSeats')
        .then(function (response) {
          resolve(response.data.rowsArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }
 onModal=()=>{
   this.setState({show:!this.state.show});
  // console.log(!this.state.show)
 }

  //async call to book the desired Seat
  requestSeatBooking=(seatId,rowName)=>{
      return new Promise(resolve=>{
        axios.post('https://movie-ticket-booking-backend.herokuapp.com/api/bookSeat', {
          rowName,
          seatId,
          sessionId:this.sessionId
        })
        .then(function (response) {
          
          let data = response.data.rowsArray

         // let booked=response.data.bookedseats

          if(response.errorMessage !== undefined)
            resolve({data});
          else
            resolve({data,errorMessage:response.data.errorMessage})
            for(var i=0;i<5;i++){
              const row=data[i].rowName;
              const seat=data[i].seats;
              console.log(row);
              console.log(seat);
            }
            

        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  //initialize the state of the componenent after getting data from server
  async componentDidMount(){
    const data = await this.loadAvailableSeatsFromServer();
    this.setState({rows:data}) 
   
  }

   //set state after booking th seat
   handleBooking = async (seatId,rowName)=>{
     
    const {data,errorMessage} = await this.requestSeatBooking(seatId,rowName);
    if(errorMessage !== undefined){
      this.setState({rows:data,showError:errorMessage}) 
    }
      
    else{
      this.setState({rows:data,booked:true})
      }
      

  }
  handleSubmit=event=>{
    event.preventDefault();
    this.onModal();
  }
  handleChange=event=>{
    this.setState({username:event.target.value,email:event.target.value})

  }
  home=async(e)=>{
    this.props.history.push("/form");
}

  render() {
    return (
      <div className="container">
        <hr></hr>
        <h3>Book your seats</h3>
        <hr></hr>
      {this.state.error}
        <ErrorView showError={this.state.showError}/>
        <div className="mt-5 w-50 mx-auto">
            {this.state.rows.map((row,i)=>{
              const rowSeats = Object.keys(row.seats).map(seatId=>{
                    return <Seat key={seatId} row={row} seatId={seatId} mySession={this.sessionId === row.seats[seatId].sessionId} booked={row.seats[seatId].booked} onBook={this.handleBooking}/>
                })
                rowSeats.push(<br key={i}/>) 
                return rowSeats;
            })}
        </div>
        <hr></hr>
        {this.state.booked?
         <button className="btn-primary" onClick={this.home}>click to enter the details</button>:
         <button className="btn-primary">Return to home page</button>
      }
        
        
        </div>
        
    );
  }
}

export default Grid;

