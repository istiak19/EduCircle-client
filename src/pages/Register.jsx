import Lottie from "lottie-react";
import register from '../assets/lottie/register.json'
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { toast } from "react-toastify";
import SocialAuth from "../components/Shared/SocialAuth";

const Register = () => {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const { signup, updateProfileUser } = useAuth()

    const handleRegister = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const name = form.get('name')
        const photo = form.get('photo')
        const email = form.get('email')
        const password = form.get('password')
        setErrorMsg('')
        // const user = { name, photo, email, password }
        if (!name || typeof name !== 'string' || name.trim() === "" || !/^[A-Za-z\s]+$/.test(name)) {
            setErrorMsg('Title should only contain letters.');
            return;
        }

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

        signup(email, password)
            .then(result => {
                // console.log(result.user)
                toast.success('Successfully Register')
                navigate('/')
                // const newUser = { name, email }
                updateProfileUser({ displayName: name, photoURL: photo })
            })
            .catch(error => {
                // console.log(error.message)
                setErrorMsg(error.message)
            })
    }

    return (
        <div className="hero min-h-screen my-10">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={register}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border">
                    <h1 className="text-4xl text-center pt-5 font-bold">Login now!</h1>
                    <form className="card-body" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="url" placeholder="Photo URL" name="photo" className="input input-bordered" required />
                        </div>
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
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#007bffc0] text-white">Register</button>
                        </div>
                        <p>Already have an account? <Link to='/login' className="text-[#007bffc0] border-b border-[#007bffc0]">Login</Link></p>
                        {
                            errorMsg && <p className="text-red-500">{errorMsg}</p>
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

export default Register;