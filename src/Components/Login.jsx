import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

export default function Login() {
    // context api
    const {createSignInUser, SignInWithGoogle} = useContext(AuthContext);
    // useNavigate for navigate to home page
    const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // login
    createSignInUser(email,password)
    .then(result=>{
        console.log(result.user);
        e.target.reset();
        navigate('/');
    })
    .catch(error=>{
        console.log("ERROR", error.message);
    })

  };

  const handleGoogleSignIn = () =>{
    SignInWithGoogle()
    .then(result=>{
      console.log(result.user);
    })
    .catch(error=>{
      console.log("ERROR", error.message);
      navigate('/');
    })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <p className="p-4">New to this website? Please <span className="underline text-red-500"><Link to={'/register'}>Register first</Link></span></p>
          <p>
            <button onClick={handleGoogleSignIn} className="btn btn-ghost">Google</button>
          </p>
        </div>
      </div>
    </div>
  );
}
