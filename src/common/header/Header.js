import  { React, useState } from 'react';
import { Button } from '@material-ui/core';
import './Header.css';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';


export default function Header(props){

        //to set open state of login/register modal
        const [modalOpenState, setopenState] = useState(false);
     
       
        
         return <div id="header" className="header">
                        <img src={logo} className="logoSvg" alt="logo" />
                        {(()=>{
                                
                                var path = props.match.path;
                                if( path == "/"){
                                        //header for home page
                                        return (
                                                <div>
                                                        <Button variant="contained" id="login-btn" className="login-logout-button btn btn-sm" style={{marginLeft: 10}} onClick={handleModalOpen}>
                                                                <span>LOGIN</span>
                                                        </Button> 
                                        
                                                        <Button variant="contained" id="logout-btn" className="login-logout-button btn btn-sm" style={{display: 'none', marginLeft: 10}} onClick={logoutHandler}>
                                                                <span>LOGOUT</span>
                                                        </Button>  
                                                </div>
                                        );
                                }else if(path == "/movie/:id"){
                                        // if page is detatial page we render necessary buttons
                                        return(
                                                <div class="btn-container">
                                                        <Button id="book-movie-btn" color="primary" variant="contained" className="btn btn-primary btn-sm" onClick={bookingHandler}>
                                                              <span>BOOK SHOW</span>
                                                        </Button>   

                                                        <Button variant="contained" id="login-btn" className="login-logout-button btn btn-primary btn-sm" style={{marginLeft: 10}} onClick={handleModalOpen}>
                                                                <span>LOGIN</span>
                                                        </Button> 
                                        
                                                        <Button variant="contained" id="logout-btn" className="login-logout-button btn btn-primary btn-sm" style={{display: 'none', marginLeft: 10}} onClick={logoutHandler}>
                                                                <span>LOGOUT</span>
                                                        </Button> 
                                               </div> 
                                        );
                                  }else{
                                          return <div>
                                                     <Button variant="contained" id="logout-btn" className="login-logout-button btn btn-primary btn-sm" style={{display: 'inline-block', marginLeft: 10}} onClick={logoutHandler}>
                                                                <span>LOGOUT</span>
                                                        </Button>
                                                 </div>
                                  }
                                })()}
                </div>

       function bookingHandler(event){
                if(window.localStorage.userName === undefined || window.localStorage.userName === null){
                //    alert("Please Login");
                //    event.preventDefault();
                //below line is add for testing purpose only
                   props.history.push({pathname: `/movie/shows/${props.match.params.id}`});
                }else{
                        //redirect to book show page
                        //set showUrl to /movie/shows/:id
                        props.history.push({pathname: `/movie/shows/${props.match.params.id}`});
                }
        }

       function logoutHandler(){
            //clear local storage
            window.localStorage.clear();
            document.getElementById('logout-btn').style.display= "none";
            document.getElementById('login-btn').style.display= "inline-block";
        }
       
       
        function login(){
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

    function handleClose(){
        setopenState(false);
     }

     function handleModalOpen(){
        setopenState(true);
     }

}