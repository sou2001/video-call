import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../SocketContext';

const Notifications = () => {
    const {call, answerTheCall, callIsAccepted} = useContext(SocketContext);
    
    return (
        <>
            {call.isReceivedCall && !callIsAccepted && (
                <div style = {{display: 'flex', justifyContent: 'space-around'}}>
                    <h1>{call.name} is calling</h1>
                    <Button variant = "contained" color = "primary" onClick = {answerTheCall}>
                        Accept
                    </Button>
                </div>
            )}
        </>
    )
}

export default Notifications