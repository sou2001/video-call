import React, { useContext, useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: '10px 20px',
    border: '2px white',
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
  
}));

const Options = ( { children } ) => {

    const {me, name, setName,  callUser, callIsAccepted, callIsEnded, leaveTheCall} = useContext(SocketContext);
    const [IdToMakeTheCall, setIdToMakeTheCall] = useState('');
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete = "off">
                    <Grid container className = {classes.gridContainer}>
                        <Grid item xs = {12} md = {6} className = {classes.padding}>
                            <Typography gutterBottom variant = "h6">User Info</Typography>
                            <TextField label = "Name" value = {name} onChange = {(e) => setName(e.target.value)} fullWidth />
                            {console.log(me)}
                            <CopyToClipboard text = {me} className = {classes.margin}>                         
                                <Button variant = "contained" color = "primary" fullWidth startIcon={<Assignment fontSize = "large" />}>
                                    Copy  ID
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                        
                        <Grid item xs = {12} md = {6} className = {classes.padding}>
                            <Typography gutterBottom variant = "h6">Make a Call</Typography>
                            <TextField label = "ID to Call" value = {IdToMakeTheCall} onChange = {(e) => setIdToMakeTheCall(e.target.value)} fullWidth />
                            {callIsAccepted && !callIsEnded ? (
                                <Button variant = "contained" color="secondary" startIcon = {<PhoneDisabled fontSize = "large" />} fullWidth onClick = {leaveTheCall}className = {classes.margin}>
                                    End Call
                                </Button>
                            ) : (   
                                <Button variant = "contained" color="primary" startIcon = {<Phone fontSize = "large" />} fullWidth onClick = {() => callUser(IdToMakeTheCall)}className = {classes.margin}>
                                    Call
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            {children}
            </Paper>
        </Container>
    )
}

export default Options