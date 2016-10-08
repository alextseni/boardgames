import React from 'react';
import classes from './LogIn.scss';

export const LogInOld = ({auth,logIn,logOut,signUp,cleanForm}) => {

    const SignIn = () => {
       logIn({
         name: document.getElementById('name1').value,
         pwd: document.getElementById('pwd1').value
       });

    };

    const SignUp = () => {
       signUp({
         name: document.getElementById('name2').value,
         email: document.getElementById('email').value,
         pwd: document.getElementById('pwd2').value
       });

    };
    const SignOut = () => {
       logOut();
    };

    $('.modal').on('hidden.bs.modal', function(){
      $(this).find('form')[0].reset();
      $(this).find('form')[1].reset();
    });

  return (

  <div className={classes.login}>
    <div className={classes.logButton}>
      <a href=".connect" className="btn btn-lg btn-default access" id={classes[auth.user.flag]} data-toggle="modal" onClick={cleanForm}>
        Log In!
      </a>
      <button className="btn btn-lg btn-default" id={classes[auth.user.flag]} data-toggle="modal" onClick={SignOut}>
        Sign Out :(
      </button>
    </div>
      <div className="modal fade connect">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={cleanForm}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form className={classes.loginForm} id="userForm1">
                <h4 className="modal-title">
                  Log In:
                </h4>
                <div className="form-group">
                  <input type="text" className="form-control" id="name1" placeholder="Username"/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="pwd1" placeholder="Password"/>
                </div>
                <div className="checkbox">
                  <label><input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <p className="alert alert-danger" id={classes.alertmsg}>
                  {auth.message.fail}
                </p>
                <button type="button" className="btn btn-default" onClick={SignIn}>
                  Log In
                </button>
              </form>
            </div>
            <a href="#signup" data-toggle="collapse">
              New Member? Register!
            </a>
            <div id="signup" className="collapse">
              <form className={classes.loginForm} id="userForm2">
                <div className="form-group">
                  <label htmlFor="username">
                    Username
                  </label>
                  <input type="text" className="form-control" id="name2" placeholder="Enter Username"/>
                  <p className="alert alert-danger" id={classes.alertmsg}>
                    {auth.message.name}
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" placeholder="Enter Email"/>
                  <p className="alert alert-danger" id={classes.alertmsg}>
                    {auth.message.email}
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">
                    Password
                  </label>
                  <input type="password" className="form-control" id="pwd2" placeholder="Enter Password"/>
                  <p className="alert alert-danger" id={classes.alertmsg}>{auth.message.pwd}</p>
                </div>
                <button type="button" className="btn btn-default" onClick={SignUp}>
                  Sign Up
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={cleanForm}>
                Close
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>

)};
export default LogInOld;
