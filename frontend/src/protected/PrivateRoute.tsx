import { Navigate } from "react-router-dom"

export const PrivateRoute=({user,children}: any)=>{
    if(!user){
        return <Navigate to={'/login'} replace />
    }
    if(!user.verified){
        return <Navigate to={'/email-conformtion'} replace />
    }
    if(user.verified){
        return <Navigate to={'/'} replace />
    }
    return children
}