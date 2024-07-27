import { useState } from "react"
import GenderCheckBox from "../components/GenderCheckBox"
import useSignUp from "../hooks/useSignUp"
import { Link } from "react-router-dom";

const SignUp = () =>{
    const {signUp, loading} = useSignUp();

    const [inputs, setInputs] = useState({
        fullname : "",
        username : "",
        password : "",
        confirmPassword : '',
        gender : '',
    })

    const handleCheckbox = (gender : 'male' | "female") =>{
        setInputs({...inputs, gender})
    }

    const handleFormSubmit = (e : React.FormEvent) =>{
        e.preventDefault();
        signUp(inputs);

    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up <span className="text-blue-500">Blue Wangsapp</span>
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input type="text" placeholder="Bagus Mustaqim" className="w-full input input-bordered h-10" value={inputs.fullname} onChange={(e)=> setInputs({...inputs, fullname : e.target.value})}/>
                            <p className="text-bold text-blue-300"> Please use your real name, you cannot edit your name later</p>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Kimi Chan" className="w-full input input-bordered h-10" value={inputs.username} onChange={(e)=> setInputs({...inputs, username : e.target.value})}/>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" placeholder="abc123?" className="w-full input input-bordered h-10" value={inputs.password} onChange={(e)=> setInputs({...inputs, password : e.target.value})}/>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="abc123" className="w-full input input-bordered h-10" value={inputs.confirmPassword} onChange={(e)=> setInputs({...inputs, confirmPassword : e.target.value})}/>
                    </div>

                    <GenderCheckBox selectedGender={inputs.gender} onCheckboxChange={handleCheckbox}/>

                    <Link to={'/login'} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"> Already have an account?<span className="text-sm font-extrabold text-blue-500"> Login</span>
                    </Link>
                    <div>
                    <button type="submit" className="btn btn-block btn-sm mt-2 border border-r-slate-700" disabled={loading}> {loading? "Loading..." : "Sign Up"}</button>
                    </div>    
                </form>
            </div>
        </div>
    )
}

export default SignUp