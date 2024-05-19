import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";


const AdminRoute = ({children}) => {
    const location = useLocation();
    const [isAdmin,adminLoading] = useAdmin()
    
    const {user,loading} = useAuth();
    if (loading || adminLoading) {
        return <div className="justify-center items-center flex mt-6 ">
            <span className="loading-spinner loading loading-md"></span>
        </div>
    }
    if(user && isAdmin){
        return children;

    }

    <Navigate to={'/'} state={location.pathname}></Navigate>
};

export default AdminRoute;