import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const { user, loading } = useAuth();
    if (loading) {
        return <div className="justify-center items-center flex mt-6 ">
            <span className="loading-spinner loading loading-md"></span>
        </div>
    }
    if (user) {
        return children;

    }

   return <Navigate state={{ from: location }} to={'/login'}></Navigate>

};

export default PrivateRoute;