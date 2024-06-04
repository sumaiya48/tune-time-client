
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Pages/Hooks/useAuth";
import useAdmin from "../Pages/Hooks/useAdmin";

const AdminRoutes = ({children}) => {

    const {user , loading} = useAuth();
    const [isAdmin , isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if(user && isAdmin){
        return children
    }

    

    return <Navigate to="/login" state={{from:location}} replace>

    </Navigate>
};

export default AdminRoutes;