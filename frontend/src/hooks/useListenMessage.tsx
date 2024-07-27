import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation";
import notifSound from "../assets/notification.mp3"

const useListenMessage = () => {
 const {socket} = useSocketContext();
 const {messages, setMessages} = useConversation() 

 useEffect(()=>{
    socket?.on("newMessage", (newMessage)=>{
        setMessages([...messages, newMessage]);
        const sound = new Audio(notifSound);
        sound.play();
    })

    return ()=> {socket?.off('newMessage')}
 }, [socket,messages,setMessages])
}

export default useListenMessage