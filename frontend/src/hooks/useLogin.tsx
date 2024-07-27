import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


const useLogin = () =>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username:string, password : string) => {
        try {
            setLoading(true)
            const body = JSON.stringify({username, password})
            console.log(body)
            const res = await fetch('/api/auth/login', {
                method : 'POST',
                headers :{
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({username, password}),
            })
            const data = await res.json()
            console.log(data)

            if(!res.ok) {
                throw new Error(data.error);
            }
            setAuthUser(data)

        } catch (err:any) {
            console.log(err.message)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, login}
}

export default useLogin