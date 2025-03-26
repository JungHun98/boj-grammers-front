import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

interface SocketContextValue {
  socket: Socket | null;
  isSocketConnect: boolean;
}

const SocketContext = createContext<SocketContextValue>({
  socket: socketInstance,
  isSocketConnect: false,
});

function createSocket(): Socket {
  if (socketInstance !== null) return socketInstance;

  try {
    const socket = io(import.meta.env.VITE_APP_URL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
    });

    return socket;
  } catch (error) {
    console.error('Failed to initialize Socket.IO:', error);
    throw new Error('Socket.IO initialization failed');
  }
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const [isSocketConnect, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socketInstance === null) {
      socketInstance = createSocket();
      setSocket(socketInstance);
      setIsConnected(socketInstance.connected);

      socketInstance?.on('connect', () => {
        setIsConnected(true);
      });

      socketInstance?.on('disconnect', () => {
        setIsConnected(false);
      });
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isSocketConnect }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(SocketContext);
};
