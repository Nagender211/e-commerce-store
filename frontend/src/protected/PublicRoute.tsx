import { Navigate } from "react-router-dom";

export const PublicRoute = ({user,children}: any) => {
    // const userId=req.user.id;
    if(user){
        return <Navigate to={'/'} replace />
    }
    return children
}
