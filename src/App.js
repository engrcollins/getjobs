import React, {component, useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import LayersIcon from '@material-ui/icons/Layers';
//import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Home.js';
import ArchiveNav from './Navigation';
import Side from './SideNav.js';
import "./App.css";
import Registration from "./components/Register";
import Login from "./components/Login";
import Filter from './components/PriceFilter';
import SearchFilter from './components/SearchFilter';

function App() {

  return (
      <div id="appContainer" >
      <Router>
          <ArchiveNav />
                <Grid container spacing={3} component={Paper} >
                <Grid item xs={12} sm={3} lg={2}>
                  <Side />
                </Grid>
                  <br/>
                  <br/>
                  <Grid item xs={9} sm={9} lg={10}>
                  <div className="appContent" style={{textAlign: "center"}}>
                  <Switch>
                    <Route path="/search-filter" component={SearchFilter} />
                    <Route path="/price-filter" component={Filter} />
                      <Route path="/registration" component={Registration} />
                      <Route path="/login" component={Login} />
                      <Route path="/" component={Home} />
                    </Switch>
                </div>
                </Grid>
                </Grid>
            <div>
            </div>
            </Router>
          </div>
  );
}

export default App;
