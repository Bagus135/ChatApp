import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<ConversationType[]>([]);

  useEffect(()=>{
    const getConversation = async () => {
        setLoading(true); 
        try {
            const res = await fetch('/api/message/conversations');
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setConversation(data);
        } catch (err:any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    getConversation();
  }, []);
    return {loading, conversation}
}

export default useGetConversation