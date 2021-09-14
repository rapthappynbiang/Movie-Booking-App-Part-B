import  { React, useState, Fragment } from 'react';
import {Button, Tabs, Tab, Input, InputLabel, FormControl, FormHelperText, Switch} from '@material-ui/core';
import './Header.css';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal'; 

const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
 
      //LoginTab component
      function LoginTab(props){
        
              const [unameErrorMessage, setUnameErrorMessage]= useState("");
              const [passwordErrorMessage, setPasswordErrorMessage]= useState("");
              const [loginData, setLoginData] = useState({username: "", password: ""});
        
          return (
             <Fragment>
                <div style={{textAlign: 'center', margin: '4px 0'}}>
                  <FormControl>
                        <InputLabel htmlFor="login-username" >Username</InputLabel>
                        <Input required id="login-username" name="username" type="text" onChange={(event)=>handleValidation(event.target.name, event.target.value)}/>
                        <div style={{color: 'red'}}>{unameErrorMessage}</div>
                  </FormControl>
                </div>
                <div style={{textAlign: 'center', margin: '4px 0'}}>
                  <FormControl>
                        <InputLabel htmlFor="login-password" >Password</InputLabel>
                        <Input required type="password" name="password" id="login-password"  onChange={(event)=>handleValidation(event.target.name, event.target.value)}/>
                        <div style={{color: 'red'}}>{passwordErrorMessage}</div>
                  </FormControl>
                </div>
                <div style={{textAlign: 'center', margin: '6px 0'}}>
                  <Button variant='contained' color='primary' onClick={loginhandler}>LOGIN</Button>
                </div>
            </Fragment>
                );

                function handleValidation(name, value){
                
                        //if tarrget name is username
                        if(name === "username"){
                                //check if  value is empty
                                if(value === ""){
                                        setUnameErrorMessage("required");
                                }else{
                                    setUnameErrorMessage("");
                                }
                        } //if target name is password
                        else{
                             //check if  value is empty
                             if(value === ""){
                                setPasswordErrorMessage("required");
                            }else{
                                setPasswordErrorMessage("");
                            }   
                        }
                      
                }

                function loginhandler(){
                        //first do validation check if empty and handle errors
                        //first check username
                        var uname = document.getElementById('login-username').value;
                        var  pword = document.getElementById('login-password').value;
                        if(uname=== "" && pword==="" ){
                                setUnameErrorMessage("required");
                                setPasswordErrorMessage("required");
                                return;
                        }else if(uname === "" && pword !== ""){
                                setUnameErrorMessage("required");
                        }else if(uname !== "" && pword === ""){
                                setPasswordErrorMessage("required");
                        }else{
                                //set login data and send to server for authentication
                               setLoginData({username: uname, password: pword});

                               //SEND logindata for authentication
                               //if authentication is successful we set isloggin in localstorage as true
                               var raw = "Authorization: Basic dGVzdDp0ZXN0QDEyMw==\nContent-Type: application/json\nCache-Control: no-cache\n";

                               var requestOptions = {
                                 method: 'POST',
                                 body: raw,
                                 redirect: 'follow'
                               };
                               
                               fetch(`http://localhost:8085/api/auth/login?username=${b2a(loginData.username)}&password=${b2a(loginData.password)}`, requestOptions)
                                 .then(response => response.text())
                                 .then((result) => {
                                        //store accessToken and uuid
                                        //set isLogin true
                                        window.localStorage.setItem("isLoggedIn", true);
                                        props.setIsLoggedIn(true);
                                        //close modal;
                                        props.handleClose()

                                 })
                                 .catch(error => console.log('error', error));
                        }

                }
      }

      //Register Tab Component
      function RegisterTab(){
              const [firstNameErrorMessage, setFirstNameError] = useState("");
              const [lastNameErrorMessage, setLastNameError] = useState("");
              const [emailErrorMessage, setEmailError] = useState("");
              const [passwordErrorMessage, setPasswordError] = useState("")
              const [contactNoErrorMessage, setContactError] = useState("");
              //Successful Registration message
              const [successMessage, setSucessMEssage] = useState("");

              const RegistrationForm = [
                    {
                      label: "First Name*",
                      name: "first-name",
                      id: "registration-first-name",
                      type: "text",

                    },
                    {
                        label: "Last Name*",
                        name: "last-name",
                        id: "registration-last-name",
                        type: "text"  
                      },
                      {
                        label: "Email*",
                        name: "email",
                        id: "registration-email",
                        type: "text"  
                      },
                      {
                        label: "Password*",
                        name: "password",
                        id: "registration-password",
                        type: "password"  
                      },
                      {
                        label: "Contact No*",
                        name: "mobile-number",
                        id: "registration-contact-no",
                        type: "text"  
                      },
              ]

              //Registration data
              const RegistrationData = {
                      email: "",
                      firstName: "", 
                      lastName: "",
                      mobile_number: null,
                      password: "",
              }

        return (<div>
                {RegistrationForm.map((element)=>(
                     <div key={element.id} style={{textAlign: 'center', margin: '5px 0'}}>
                        <FormControl>
                                <InputLabel htmlFor={element.id}>{element.label}</InputLabel>
                                <Input required id={element.id} type={element.type} name={element.name} label={element.label} onChange={(event)=>handleValidation(event.target.name, event.target.value)}  />
                                <FormHelperText style={{color: 'red'}}>
                                {(()=>{
                                        if(element.name === "first-name"){
                                                return firstNameErrorMessage;
                                        }else if(element.name === "last-name"){
                                                return lastNameErrorMessage;
                                        }else if(element.name === "email"){
                                                return emailErrorMessage;
                                        }else if(element.name=== "password"){
                                                return passwordErrorMessage;
                                        }else{
                                                return contactNoErrorMessage;
                                        }
                                })()}</FormHelperText>
                        </FormControl>
                     </div> 
                ))}
                <div id="success-message" style={{textAlign: 'center'}}>
                            <p>{successMessage}</p>
                        </div>
                <div style={{textAlign: 'center'}}>
                <Button variant="contained" color="primary" style={{marginTop: 20}} onClick={handleRegistration}>Register</Button>
                </div>
              </div>);

              function handleValidation(validationName, value){
                      
                    if(validationName === "first-name"){
                            if(value === ""){
                                    setFirstNameError("required");
                            }else{
                                    setFirstNameError("");
                                    //set registration first name
                                    RegistrationData.firstName = value;
                            }
                            return;
                    }else if(validationName==="last-name"){
                        if(value === ""){
                                setLastNameError("required");
                        }else{
                                setLastNameError("");
                                //set registration lastname
                                RegistrationData.lastName = value;
                        }
                        return;
                }else if(validationName === "email"){
                            if(value === ""){
                                setEmailError("required");
                            }else{
                                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                var isValid = re.test(value); 

                               if(isValid){
                                       setEmailError("");
                                       //set registration email
                                       RegistrationData.email = value;
                               }else{
                                       setEmailError("invalid email");
                               }
                            }
                            return;
                    }else if(validationName === "password"){
                        if(value === ""){
                                setPasswordError("required");
                        }else{
                                const regx = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                                if(regx.test(value)){
                                   setPasswordError("");
                                   //encrypt password if possible
                                   RegistrationData.password = value;
                                }else{
                                    setPasswordError("Invalid Password");
                                }
                        } 
                        return;
                    }else{
                            if(value===""){
                                    setContactError("required");
                            }else{
                                const regx = /[^a-zA-Z!@#$%^&*]{10,10}$/;  
                                if(regx.test(value)){
                                        setContactError("");
                                        //set registration phone number
                                        RegistrationData.mobile_number = value;
                                }else{
                                         setContactError("Please enter a Valid Number");
                                } 
                            }
                    }
              }


              function handleRegistration(){
                      //do checking if any field is not filled
                      var areInputsFilled = true;
                      if(document.getElementById('registration-first-name').value === ""){
                        setFirstNameError("required");
                        areInputsFilled = false;
                      }
                      if(document.getElementById('registration-last-name').value === ""){
                        setLastNameError("required");
                        areInputsFilled = false;
                      }
                     if(document.getElementById('registration-email').value === ""){
                        setEmailError("required");
                        areInputsFilled = false;
                     }
                     if(document.getElementById('registration-password').value === ""){
                        setPasswordError("required");
                        areInputsFilled = false;
                     }
                     if(document.getElementById('registration-contact-no').value === ""){
                        setContactError("required");
                        areInputsFilled = false;
                     }

                     //if all fields are filled throw a success alert and submit data to server
                     if(areInputsFilled){
                             setSucessMEssage("Registration successful. Please login!");
                             //sent data to server if possible
                             var raw = `{\n            \"email_address\":"${RegistrationData.email}",\n            \"first_name\": “${RegistrationData.firstName}”,\n            \"last_name\":”${RegistrationData.lastName}”,\n            \"mobile_number\":${RegistrationData.mobile_number},\n            \"password\": “${RegistrationData.password}”\n        }\n`;

                                var requestOptions = {
                                method: 'POST',
                                body: raw,
                                redirect: 'follow'
                                };

                                fetch("http://localhost:8085/api/auth/signup", requestOptions)
                                .then(response => response.text())
                                .then(result => console.log(result))
                                .catch(error => console.log('error', error));
                     }
              }
       
    }

export default function Header(props){
        
        //to set open state of login/register modal
        const [modalIsOpen, setIsOpen] = useState(false);
        //value of tab in modal either 0(Login) or 1(register)
        const [value, setValue] = useState(0);

        //set isLoggedInState
        const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem("isLoggedIn"));

        function handleTabChange(event){
            setValue(event.target.value);
        }
        
         return <div id="header" className="header">
                        <img src={logo} className="logoSvg" alt="logo" />
                        {(()=>{
                                
                                var path = props.match.path;
                                if( path == "/"){
                                        //header for home page
                                        return (
                                                <div>
                                                    {/* Get LOGIN or LOGOUT button */}
                                                    {showLoginOrLogout()}
                                                        {/**The Modal */}
                                                        <Modal
                                                                isOpen={modalIsOpen}
                                                                onRequestClose={handleClose}
                                                                style={customStyles}
                                                        >
                                                        <div>
                                                                <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
                                                                <Tab label="LOGIN" value={0} index={0}/>
                                                                <Tab label="REGISTER" value={1} index={1}/>
                                                                </Tabs>
                                                                {/* Login Tab */}
                                                                {value == 0 && <LoginTab handleClose={handleClose} setIsLoggedIn={setIsLoggedIn} />}
                                                                {/* Register Tab */}
                                                                {value == 1 && <RegisterTab />}
                                                        </div>
                                                        </Modal>
                                                </div>
                                                        );
                                }else if(path == "/movie/:id"){
                                        // if page is detatial page we render necessary buttons
                                        return(
                                                <div class="btn-container">
                                                   <Button id="book-movie-btn" color="primary" variant="contained" className="btn btn-primary btn-sm" onClick={bookingHandler}>
                                                        <span>BOOK SHOW</span>
                                                   </Button>   

                                                    {/* Get LOGIN or LOGOUT button */}
                                                    {showLoginOrLogout()}

                                                       {/**The Modal */}
                                                       <Modal
                                                                isOpen={modalIsOpen}
                                                                onRequestClose={handleClose}
                                                                style={customStyles}
                                                        >
                                                        <div>
                                                                <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
                                                                <Tab label="LOGIN"/>
                                                                <Tab label="REGISTER"/>
                                                                </Tabs>
                                                                {/* Login Tab */}
                                                                {value == 0 && <LoginTab handleClose={handleClose} setIsLoggedIn={setIsLoggedIn} />}
                                                                {/* Register Tab */}
                                                                {value == 1 && <RegisterTab />}
                                                        </div>
                                                        </Modal>s
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

       function bookingHandler(){
                if(window.localStorage.userName === undefined || window.localStorage.userName === null){
                        // alert("Please Login");
                        //open login Modal
                        handleModalOpen();

                        //check if user has loggedin
                        if(isLoggedIn === true){
                             //redirect to book show page
                             //set showUrl to /movie/shows/:id
                           props.history.push({pathname: `/movie/shows/${props.match.params.id}`});    
                        }  
                }else{
                        //redirect to book show page
                        //set showUrl to /movie/shows/:id
                        props.history.push({pathname: `/movie/shows/${props.match.params.id}`});
                }
        }

        //to render a login or a logout button 
       function showLoginOrLogout(){
            //if isLoggedIn is false then show LOGIN else show Logout

            if(isLoggedIn === false || isLoggedIn === undefined || isLoggedIn === "" || isLoggedIn === null){
                return <Button variant="contained" id="login-btn" className="login-logout-button btn btn-sm" style={{marginLeft: 10}} onClick={handleModalOpen}>
                            <span>LOGIN</span>
                        </Button>
              } else{
                 return <Button variant="contained" id="logout-btn" className="login-logout-button btn btn-sm" style={{display: 'inline-block', marginLeft: 10}} onClick={logoutHandler}>
                            <span>LOGOUT</span>
                        </Button>
              }
       }

     function logoutHandler(){
        //clear local storage
        window.localStorage.clear();

        //set login state isLogedIn as false and render Login Button
        setIsLoggedIn(false);
    }

    function handleClose(){
        setIsOpen(false);
     }

     function handleModalOpen(){
        setIsOpen(true);
     }

}