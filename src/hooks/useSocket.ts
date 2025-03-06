import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

function createSocket(): Socket {
  if (!socketInstance) {
    try {
      socketInstance = io(import.meta.env.VITE_APP_URL, {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
      });

      if (socketInstance === null) {
        throw new Error('Socket instance is null');
      }
    } catch (error) {
      console.error('Failed to initialize Socket.IO:', error);
      throw new Error('Socket.IO initialization failed');
    }
  }

  return socketInstance;
}

function useSocket(): [Socket, boolean] {
  const socketRef = useRef<Socket | null>(null);
  const [isConnect, setIsConnect] = useState<boolean>(false);

  useEffect(() => {
    if (!socketInstance) {
      socketRef.current = createSocket();

      socketRef.current.on('connect', () => {
        setIsConnect(true);
      });

      socketRef.current.on('disconnect', () => {
        setIsConnect(false);
      });
    }
  }, []);

  return [socketInstance as Socket, isConnect];
}

export default useSocket;
