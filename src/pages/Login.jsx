import Lottie from "lottie-react";
import login from '../assets/lottie/login.json'
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import useAuth from "../Hook/useAuth";
import { toast } from "react-toastify";
import SocialAuth from "../components/Shared/SocialAuth";

const Login = () => {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const { signin, isDarkMode } = useAuth()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')
        setErrorMsg('')

        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters long.')
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setErrorMsg('Password must contain at least one uppercase letter.')
            return;
        }

        if (!/[a-z]/.test(password)) {
            setErrorMsg('Password must contain at least one lowercase letter.')
            return;
        }

        signin(email, password)
            .then(result => {
                // console.log(result.user)
                e.target.reset()
                navigate('/')
                toast.success('Successfully login')
            })
            .catch(error => {
                // console.log(error.message)
                setErrorMsg(error.message)
            })
    }


    return (
        <div className={`hero min-h-screen my-4 ${isDarkMode && 'bg-[#1D232A]'}`}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={login}></Lottie>
                </div>
                <div className={`card w-full max-w-md shrink-0 shadow-2xl border ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    <h1 className="text-4xl text-center pt-5 font-bold">Login now!</h1>
                    <form className={`card-body ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`} onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className={`label-text ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" className={`input input-bordered ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`} required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className={`label-text ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Password</span>
                            </label>
                            <input type={showPassword ? 'password' : 'text'} placeholder="Password" name="password" className={`input input-bordered ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`} required />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute top-14 right-3">{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</button>
                            <label className="label">
                                <a href="#" className={`label-text-alt link link-hover  ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#007bffc0] text-white hover:bg-blue-500">Login</button>
                        </div>
                        <p>Don't have an account? <Link to='/register' className="text-[#007bffc0] border-b border-[#007bffc0]">Register</Link></p>
                        {
                            errorMsg && <p>{errorMsg}</p>
                        }
                    </form>
                    <div className="flex flex-col justify-center items-center pb-8 space-y-4">
                        <div className="divider px-8 text-[#007bffc0]">OR</div>
                        <SocialAuth></SocialAuth>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;