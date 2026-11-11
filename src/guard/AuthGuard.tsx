
import { Navigate } from "react-router-dom"


export default function AuthGuard({children}) {

    if(localStorage.getItem('token')){
        return <Navigate to={'/posts'}/>
    }
    return children
}
