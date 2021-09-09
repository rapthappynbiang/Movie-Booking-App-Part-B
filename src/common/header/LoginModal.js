import React from 'react';
export default function LoginModal(props){
     
    return(
        <div id="loginModal" className="modal fade">
         <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Please Login</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>{
                      document.getElementById('loginModal').style.display= "none";
                }}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <form action="" mathod="">
                    <div className="form-group row justify-content-around">
                        <label className="col-sm-2 col-form-label" htmlFor="username">Username</label>
                        <input required className="form-control col-sm-6" id="username" type="text" placeholder="Enter username" />
                    </div>

                    <div className="form-group row text-center justify-content-around">
                        <label className="col-sm-2 col-form-label" htmlFor="password">Password</label>
                        <input required className="form-control col-sm-6" id="password" type="password" placeholder="Enter password" />
                    </div>
                </form>
                </div>
                <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{props.login()}}>
                    <span>Login</span>
                </button>
                </div>
            </div>
            </div>`
        </div>
    );
}