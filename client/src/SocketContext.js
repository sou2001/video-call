import React, { createContext, useState, useRef, useEffect } from 'react';
import{ io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://v2-meet.herokuapp.com/');

const ContextProvider = ({ children }) => {

    const [me, setMe] = useState('');
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [callIsAccepted, setCallIsAccepted] = useState(false);
    const [callIsEnded, setCallIsEnded] = useState(false); 
    const [stream, setStream] = useState(null);

    const ourVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                ourVideo.current.srcObject = currentStream;
            });

        socket.on('me',(id) => setMe(id));

        socket.on('callingtheuser', ({ from, name: NameOfTheCaller, signal }) => {
            setCall({ isReceivedCall: true, from, name: NameOfTheCaller, signal })           
        });
    }, []);

    const answerTheCall = () => {
        setCallIsAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerthecall', {signal: data, to: call.from});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callingtheuser', {userToCall: id, signalData: data, from: me, name});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callisaccepted', (signal) => {
            setCallIsAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveTheCall = () => {
        setCallIsEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{call,name,setName,ourVideo,userVideo,callIsAccepted,stream,callIsEnded,me,callUser,leaveTheCall,answerTheCall,}}>
            {children}
        </SocketContext.Provider>
    );
};

export{ContextProvider, SocketContext};
