import { useLocation } from "react-router-dom";


function Dashboard(){
    const location = useLocation()
    const username = location.state?.userName||"Guest" ;
    return(
        <h1>Welcome {username}</h1>
    )
}

export default Dashboard;