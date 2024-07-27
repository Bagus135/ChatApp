/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import io, {Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

interface ISocketContect {
    socket : Socket | null;
    onlineUsers : string[];
}

const socketURL = import.meta.env.MODE === 'development' ? "http://localhost:5000" : '/'

export const useSocketContext = () : ISocketContect =>{
    const  context = useContext(SocketContext);
    if(context === undefined){
        throw new Error('useSocketContext must be used within a SockedContextProvider')
    }
    return context
}


const SocketContext = createContext<ISocketContect|undefined>(undefined);

const SocketContextProvider = ({children} : {children :ReactNode})=>{
    const socketRef = useRef<Socket|null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const {authUser, isLoading} = useAuthContext();

    useEffect(()=>{
        if (authUser && !isLoading){
            const socket = io(socketURL, {
                query : {
                    userID : authUser.id,
                }
            })
            socketRef.current = socket

            socket.on('getOnlineUsers', (users:string[])=>{
                setOnlineUsers(users)
            });

            return () =>{
                socket.close();
                socketRef.current = null;
            }
        } else if (!authUser && !isLoading){
            if(socketRef.current){
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    }, [authUser, isLoading] );

    return(
        <SocketContext.Provider value={{socket : socketRef.current, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider