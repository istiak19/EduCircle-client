import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

const PrivateRouter = ({ children }) => {
    const { loading, user } = useAuth()
    if (loading) {
        return <p>Loading.....</p>
    }

    if (user) {
        return children
    }
    return (
        <div>
            <Navigate to='/login'></Navigate>
        </div>
    );
};

export default PrivateRouter;