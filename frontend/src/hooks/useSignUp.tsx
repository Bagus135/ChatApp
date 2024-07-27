import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

type SignUpInputs = {
    fullname : string;
    username : string;
    password : string;
    confirmPassword : string;
    gender : string;
}

const useSignUp = () =>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signUp = async (inputs:SignUpInputs) => {
        try {
            setLoading(true)
            const res = await fetch('/api/auth/signup', {
                method : 'POST',
                headers :{
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(inputs),
            })
            const data = await res.json()

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
    return {loading, signUp}
}

export default useSignUp