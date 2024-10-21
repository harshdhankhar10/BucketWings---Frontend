import React, { createContext, useContext, useState , useEffect} from 'react'
import io from 'socket.io-client'

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    const [socket , setSocket]= useState(null);
    const [onlineUser,setOnlineUser]=useState([]);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user)
    useEffect(()=>{
        if(auth){
            const socket = io(`${import.meta.env.VITE_REACT_APP_API}`,{
                query:{
                    userId:auth?.id,
                }
            })
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUser(users)
            });
            setSocket(socket);
            return()=>socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null); 
            }
        }
    },[auth]);
    return(
    <SocketContext.Provider value={{socket , onlineUser}}>
        {children}
    </SocketContext.Provider>
    )
}