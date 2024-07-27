/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessage from "../../hooks/useListenMessage";
import useScroll from "../../hooks/useScroll";
import Message from "./Message";
import MessageSkelekton from "./MessageSkelekton";

const Messages = () =>{
    const {loading, messages} = useGetMessages();
    useListenMessage()

    const ref = useScroll(messages) as React.MutableRefObject<HTMLDivElement>;

    return(
        <div className="px-4 flex-1 overflow-auto" ref={ref}>
            {loading && [...Array(3)].map((_,idx) => <MessageSkelekton key={idx}/>)}

            {!loading && messages.map((message:any) => <Message key={message.id} message={message}/>)}

            {!loading && messages.length ===0 && (
                <p className="text-center text-white"> Send a message to start the conversation</p>
            )}
        </div>
    )
}

export default Messages