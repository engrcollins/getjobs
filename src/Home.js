import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import './Home.css'
import { Grid,Typography} from "@material-ui/core";

const Home = () =>{

  
  return (
    <div className="">
        <Grid item xs={12} sm={8} lg={9} className="appContent">
          <Typography variant="h3" component= "h5" gutterBottom>
            Welcome to our website...
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} lg={2} className="rightSide">
          <h4></h4>
      </Grid>
    </div>
    )
}
export default Home;