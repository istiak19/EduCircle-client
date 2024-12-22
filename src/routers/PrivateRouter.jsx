import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Loading from "../components/Loading/Loading";

const PrivateRouter = ({ children }) => {
    const { loading, user } = useAuth()
    if (loading) {
        return <Loading></Loading>
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