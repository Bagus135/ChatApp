import { useState } from "react"
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

const SearchInput = () =>{
    const [search, setSearch] = useState("");
    const {setSelectedConversation} = useConversation();
    const {conversation} = useGetConversation();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!search) return;
        
        const cnverstion = conversation.find((a : ConversationType) => a.fullname.toLowerCase().includes(search.toLowerCase()));
        
        if(cnverstion){
            setSelectedConversation(cnverstion);
            setSearch('')
        } else {
            toast.error("No User Found")
        }
    }
    
    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full" value={search} onChange={(e)=> setSearch(e.target.value)}/>
            <button type="submit" className="btn md:btn-md btn-sm btn-circle bg-sky-500" >
                <Search className="w-4 h-4 md:w-6 md:h-6 outline-none"/>
            </button>
        </form>
    )
}

export default SearchInput