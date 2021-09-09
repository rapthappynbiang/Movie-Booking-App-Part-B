import  { React, Component } from 'react';
import { Button } from '@material-ui/core';
import './Header.css';
import LoginModal from './LoginModal.js';
import logo from './logo.svg';

export default class Header extends Component{

        state={open: false}
       
        render(){
         return <div id="header" className="header">
                        <img src={logo} className="logoSvg" alt="logo" />
                        {(()=>{
                                
                                var location = window.location.href.split("/")[3];
                                if( location == ""){
                                        //header for home page
                                return (
                                        <div>
                                                <Button variant="contained" id="login-btn" className="login-logout-button btn btn-sm" style={{marginLeft: 10}} onClick={this.handleModalOpen}>
                                                        <span>LOGIN</span>
                                                </Button> 
                                
                                                <Button variant="contained" id="logout-btn" className="login-logout-button btn btn-sm" style={{display: 'none', marginLeft: 10}} onClick={this.logoutHandler}>
                                                        <span>LOGOUT</span>
                                                </Button>  

                                                //Login Modal
                                                <LoginModal login={this.login} />
                                        </div>
                                )
                                }else{
                                        // if page is detatial page we render necessary buttons
                                        return(
                                                <div class="btn-container">
                                                <Button id="book-movie-btn" color="primary" variant="contained" className="btn btn-primary btn-sm" onClick={this.bookingHandler}>
                                                        <span>BOOK SHOW</span>
                                                </Button>   

                                                <Button variant="contained" id="login-btn" className="login-logout-button btn btn-primary btn-sm" style={{marginLeft: 10}} onClick={this.handleModalOpen}>
                                                        <span>LOGIN</span>
                                                </Button> 
                                
                                                <Button variant="contained" id="logout-btn" className="login-logout-button btn btn-primary btn-sm" style={{display: 'none', marginLeft: 10}} onClick={this.logoutHandler}>
                                                        <span>LOGOUT</span>
                                                </Button>  

                                                //Login Modal
                                                <LoginModal open={this.state.open} login={this.login} />
                                                </div>
                                        )
                                }
                        })()}
                </div>
        }

        bookingHandler(){
                if(window.localStorage.userName === undefined || window.localStorage.userName === null){
                   alert("Please Login");
                }else{
                        //redirect to payment
                }
        }

        logoutHandler(){
            //clear local storage
            window.localStorage.clear();
            document.getElementById('logout-btn').style.display= "none";
            document.getElementById('login-btn').style.display= "inline-block";
        }
       
       
        login(){
                let userName = document.getElementById("username").value;
                let passWord = document.getElementById("password").value;
                if(userName == "admin" && passWord == "admin"){
                    alert("Successfully loggedin");
                    localStorage.setItem("userame", userName);
                    localStorage.setItem("password", passWord);
                    document.getElementById("logout-btn").style.display = "inline-block";
                    document.getElementById("login-btn").style.display = "none";
                    document.getElementById("loginModal").style.display = "none"; 
                    
                }
            }

     handleClose(){
             this.setState({open: false});
     }

     handleModalOpen(){
             this.setState({open: true});
     }
}