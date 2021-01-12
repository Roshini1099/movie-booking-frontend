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
      showError : ``
  }

  //API calls

 //async call to get data from the server
  loadAvailableSeatsFromServer = ()=>{
    return new Promise(resolve=>{
        axios.get('http://localhost:3000/api/currentSeats')
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
        axios.post('http://localhost:3000/api/bookSeat', {
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
    if(errorMessage !== undefined)
      this.setState({rows:data,showError:errorMessage}) 
    else
      this.setState({rows:data}) 

  }
  handleSubmit=event=>{
    event.preventDefault();
    this.onModal();
  }
  handleChange=event=>{
    this.setState({username:event.target.value,email:event.target.value})

  }

  render() {
    return (
      <div className="container">
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
        <h4 className="text-muted text-center mb-2">Book a seat to watch a Show!!!!!!!!</h4>
        <hr></hr>
          <div className="row">
            <div className="col-sm-4" />
                <div className="col-sm-8">
                <div className="card p-5 shadow">
            
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <fieldset>
                              <label>
                                <p>Name:</p>
                                  <input 
                                  className="form-control"
                                  type="text"
                                  name="username"
                                  value={this.state.data.username}
                                  onChange={this.handleChange.bind(this)}
                                  required
                                     />
                              </label>
                            </fieldset>
                          </div>
                          <div className="form-group">
                          <fieldset>
                              <label>
                                <p>Movies:</p>
                                 <select name="movies">
                                    <option value="">--Please choose a movie--</option>
                                    <option value="Kingslavia">Kingsglaive</option>
                                    <option value="evildead">Finalfantasy</option>
                                    <option value="zootopia">ResidentEvil</option>
                                  </select>
                              </label>
                            </fieldset>
                          </div>
                          <div className="form-group">
                            
                            <fieldset>
                              <label>
                                <p>Email:</p>
                                  <input
                                  className="form-control"
                                  type="text"
                                  name="email"
                                  value={this.state.data.email}
                                  onChange={this.handleChange.bind(this)}
                                   
                                   />
                             </label>
                            </fieldset>
                          </div>
                            <button type="submit">Submit</button>  
                            <Modal show={this.state.show} modalClosed={this.onModal}>
                              <h4>Success!!</h4>
                              <div>
                               <p>Ticket has been successfully booked</p>
                              </div>
                            </Modal>
            </form>
          
          </div>
        </div>
        </div>
        </div>
        
    );
  }
}

export default Grid;
