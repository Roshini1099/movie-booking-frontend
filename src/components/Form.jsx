import React, { Component } from 'react';
import Modal from "./Modal/index";
class form extends Component {
    state = { 
        data:[{username:'',email:''}],
        show:false
     }


     onModal=()=>{
        this.setState({show:!this.state.show});
       // console.log(!this.state.show)
      }

      handleSubmit=event=>{
        event.preventDefault();
        this.onModal();
      }
      handleChange=event=>{
        this.setState({username:event.target.value,email:event.target.value})
    
      }
      home=async(e)=>{
        this.props.history.push("/");
    }
    render() { 
        return ( 
            <div>
                <div>
                <hr></hr>
                <h4 className="text-muted text-center mb-2">Fill your details to complete the booking!!!!!!!!</h4>
                <hr></hr>
                </div>
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
                                <p>Email:</p>
                                  <input
                                  className="form-control"
                                  type="text"
                                  name="email"
                                  value={this.state.data.email}
                                  onChange={this.handleChange.bind(this)}
                                   required
                                   />
                             </label>
                            </fieldset>
                          </div>
                          <div className="form-group">
                            <fieldset>
                              <label>
                                <p>Contactnumber:</p>
                                  <input
                                  className="form-control"
                                  type="number"
                                  name="phone"
                                   required
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
                            <div>
                                <hr></hr>
          <button type="submit" className="btn btn-primary center" onClick={this.home}>
                        Return to HomePage
                    </button>
          </div>
                         </form>
                        </div>
                        <hr></hr>
             
        </div>
        </div>
            </div>
         );
    }
}
 
export default form;