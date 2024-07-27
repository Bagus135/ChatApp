import { useState } from "react";
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin";


const Login = () => {
    const [inputs, setInputs] = useState({
        username : "",
        password : ""
    });

    const {loading, login} = useLogin();

    const handleFormSubmit = (e :React.FormEvent) => {
        e.preventDefault();
        login(inputs.username, inputs.password)
    }

  return(
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
            Login
            <span className="text-blue-500"> Blue Wangsapp</span>
        </h1>

        <form onSubmit={handleFormSubmit}>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Username</span>
                </label>
                <input type="text" placeholder="Taqim" className="w-full input input-bordered h-10" value={inputs.username} onChange={(e) => setInputs({...inputs, username : e.target.value})}/>
            </div>
           
            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Password</span>
                </label>
                <input type="text" placeholder="Your Password" className="w-full input input-bordered h-10" value={inputs.password} onChange={(e) => setInputs({...inputs, password : e.target.value})}/>
            </div>
            
            <Link to={'/signup'} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"> {"Don't"} have an account? <span className="text-sm font-extrabold text-blue-500"> Sign Up</span>
            </Link>
            
            <div>
            <button type="submit" className="btn btn-block btn-sm mt-2 border border-r-slate-700" disabled={loading}> {loading? "Loading..." : "Login"}</button>
            </div>
        </form>

        </div>
    </div>
)
}

export default Login