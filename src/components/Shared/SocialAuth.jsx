import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../Hook/useAuth";

const SocialAuth = () => {

    const { googleSign } = useAuth()

    const handleGoogle = () => {
        googleSign()
            .then(result => {
                console.log(result.user)
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <button onClick={handleGoogle} className="btn border-2 border-[#007bffc0] rounded-full px-10"><FaGoogle></FaGoogle>Continue with Google</button>
        </div>
    );
};

export default SocialAuth;