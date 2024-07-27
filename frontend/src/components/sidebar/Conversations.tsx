import useGetConversation from "../../hooks/useGetConversation"
import Conversation from "./Conversation";

const Conversations = () => {
  const {conversation, loading} = useGetConversation();
 
    return (
    <div className="py-2 flex flex-col overflow-auto">
        {conversation.map((conversation)=>(
            <Conversation key={conversation.id} conversation={conversation}/>)
        )}
    {loading? <span className="loading loading-spinner mx-auto"/> : null}
    </div>
  )
}

export default Conversations