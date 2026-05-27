import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({children})=> {
    const {user} = useSelector((store)=> store.auth);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!user === null || user.role !== 'Recruiter'){
            navigate("/")
        }
    }, [user, navigate]);

    if(!user === null || user.role !== 'Recruiter'){
            return null;
        }
    return (
        <>
        {children}
        </>
    )
}

export default ProtectedRoute;