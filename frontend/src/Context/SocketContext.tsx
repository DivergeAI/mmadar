import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../utils/constants';

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(BASE_URL, {
            path: '/ws/socket.io',
            auth: { token: localStorage.getItem('token') },
            // withCredentials :true
        });
        setSocket(newSocket)


        newSocket.on('connect', () => {
        });

        

        return () => {
            newSocket.disconnect();
        };
    }, []);
  
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;