import { LogOut } from "lucide-react"
import useLogout from "../../hooks/useLogout"

const LogOutButton = () =>{
   const {logout} = useLogout()

    return(
        <div className="mt-auto">
            <LogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout}/>
        </div>
    )
}

export default LogOutButton