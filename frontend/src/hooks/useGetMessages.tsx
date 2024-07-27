import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const{messages, setMessages, selectedConversation} = useConversation()

  useEffect(()=>{
    const getMessages = async () => {
        if(!selectedConversation) return;
        setLoading(true); 
        setMessages([])
        try {
            const res = await fetch(`api/message/get/${selectedConversation.id}`);
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "An error occurred");
            }
            setMessages(data);
        } catch (err:any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    getMessages();
  }, [selectedConversation, setMessages]);
    return {loading, messages}
}

export default useGetMessages