import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../SocketContext';
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '2px',
    border: '1px white',
    margin: '10px',
},
    video: {
      width: '600px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
  }));

const VideoPlayer = () => {

  const {name, stream, call, ourVideo, userVideo, callIsAccepted, callIsEnded} = useContext(SocketContext);
    const classes = useStyles();
    return (
      <Grid container className={classes.gridContainer}>

        {/* Our Video */}

        {
          stream && (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                <video playsInline muted ref={ourVideo} autoPlay className={classes.video} />
              </Grid>
            </Paper>
        )}

        {/* User's Video */}

        {
          callIsAccepted && !callIsEnded && (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                <video playsInline ref={userVideo} autoPlay className={classes.video} />
              </Grid>
            </Paper>
        )}
        
      </Grid>
    );
};

export default VideoPlayer;