import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { getId } from '../../../entities/profile/ui/ProfileSummary/model/summarySelectors';

const socketUrl = process.env.REACT_APP_WS_URL || 'http://26.159.115.15:5000';
const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const userId = useSelector(getId);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!userId) return;
        const sock = io(socketUrl, { query: { userId } });

        sock.on('connect', () => {
            console.log('WS connected', sock.id);
        });
        sock.on('disconnect', () => {
            console.log('WS disconnected');
        });

        setSocket(sock);
        return () => sock.disconnect();
    }, [userId]);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);