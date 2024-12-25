import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../Hook/useAuth";
import { useNavigate } from "react-router-dom";

const SocialAuth = () => {

    const { googleSign, isDarkMode } = useAuth()
    const navigate = useNavigate()

    const handleGoogle = () => {
        googleSign()
            .then(result => {
                // console.log(result.user)
                navigate('/')
            })
            .catch(error => {
                // console.log(error.message)
            })
    }

    return (
        <div>
            <button onClick={handleGoogle} className={`${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'} btn border-2 border-[#007bffc0] rounded-full px-10 hover:bg-blue-500 hover:text-white`}><FaGoogle></FaGoogle>Continue with Google</button>
        </div>
    );
};

export default SocialAuth;