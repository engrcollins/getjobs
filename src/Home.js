import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Grid,Typography} from "@material-ui/core";
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';


const Home = () =>{
  const [isLoading, setIsLoading] = useState(false)

  const fetchJob = () => {
    //setIsLoading(true);
    for (var i = 0; i < 5; i++){
      let scrapeTimer = setTimeout(() =>{
        axios.get('http://localhost:8000/scrape')
        //axios.get('https://localhost:8080/birthday-wishes')
        .then((response) => {
          console.log(response.data)
        })
        .catch(() => alert('Error fetching new users'));
      }, 5000);
      /*if resonse = bla bla
        clearTimeout(scrapeTimer)*/
    }  
  }
  
  return (
    <div className="">
        <Grid item xs={12} sm={8} lg={9} className="appContent">
          <Typography variant="h3" component= "h5" gutterBottom>
            Welcome to our website...
            <div>
                {
                isLoading ? 
                (
                  <button align='center' class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Firing...
                  </button>
              ) : (
                <div>
                  <button align='center' color="primary" class="btn btn-primary" onClick={fetchJob} >
                    Fire
                  </button>
                </div>
              )
              }
            </div>

          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} lg={2} className="rightSide">
          <h4></h4>
      </Grid>
    </div>
    )
}
export default Home;