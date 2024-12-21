import Lottie from "lottie-react";
import login from '../assets/lottie/login.json'
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { useState } from "react";

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword, setShowPassword] = useState(true)

    const handleLogin = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')
        const user = { email, password }
        console.log(user)
        setErrorMsg('')
    }


    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={login}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                    <h1 className="text-4xl text-center pt-5 font-bold">Login now!</h1>
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'password' : 'text'} placeholder="Password" name="password" className="input input-bordered" required />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute top-14 right-3">{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</button>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#007bffc0] text-white">Login</button>
                        </div>
                        <p>Don't have an account? <Link to='/register' className="text-[#007bffc0] border-b border-[#007bffc0]">Register</Link></p>
                        {
                            errorMsg && <p>{errorMsg}</p>
                        }
                    </form>
                    <div className="flex flex-col justify-center items-center pb-8 space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                            <hr className="border-t-2 border-[#007bffc0] flex-grow" />
                            <span className="text-black font-medium">Or</span>
                            <hr className="border-t-2 border-[#007bffc0] flex-grow" />
                        </div>
                        <button className="btn border-2 border-[#007bffc0] rounded-full px-10"><FaGoogle></FaGoogle>Continue with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;