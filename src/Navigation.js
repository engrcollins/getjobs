
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./App.css";
import AppBar from '@material-ui/core/AppBar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
  button: {
      borderRadius: 20,
    },
    links: {
      float: "left",
      color: "rgb(36, 34, 34)",
      paddingTop: 0,
      fontWeight: "bolder",
      textAlign: "center",
      marginTop: 0,
    },
  });

const ArchiveNav = () =>{
  const category = "life";

    //Search Catalog
    const searchCatalog = () =>{ 
        let searchInput = document.getElementById('article-searcher').value 
        searchInput=searchInput.toLowerCase(); 
        let allTitle = document.getElementsByClassName('list-group-item'); 
        
        for (let i = 0; i < allTitle.length; i++) { 
          if (!allTitle[i].innerHTML.toLowerCase().includes(searchInput)) { 
                  allTitle[i].parentElement.style.display="none";
          } 
          else {
            allTitle[i].parentElement.style.display="block";				 
          } 
        } 
      }
      const classes = useStyles();
        return(
            <div>
            <div className="navbar">
              <Typography variant="h6" component="h7" >
                    <Link to={"/e-commerce"} className={classes.links}>
                      <ListItemText primary="HOME" styles={{fontWeight:"bold"}}/>
                    </Link>
                          <div className="dropdown">
                            <button className="dropbtn"><Link to={"/category/" + category} className={classes.links}>
                              <ListItemText primary="CATEGORIES" />
                            </Link></button>
                              <div className="dropdown-content">
                                <Link to={"/category/" + category} className={classes.links}>
                                  <ListItemText primary="Life" />
                                </Link>
                                <Link to={"/category/" + category}>
                                  <ListItemText primary="Career & Business" />
                                </Link>
                                <Link to={"/category/" + category}>
                                  <ListItemText primary="Education" />
                                </Link>
                                <Link to={"/category/" + category}>
                                  <ListItemText primary="Health" />
                                </Link>
                                <Link to={"/category/" + category}>
                                  <ListItemText primary="Religion" />
                                </Link>
                              </div>
                          </div>
                          <Link to={"/about-us"} className={classes.links}>
                            <ListItemText primary="ABOUT US" />
                          </Link>
                          <Link to={"/contact-us"} className={classes.links}>
                            <ListItemText primary="CONTACT US" />
                          </Link>
                          <div className="article-search">
                              <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                              >
                                  <SearchOutlinedIcon />
                                  Search
                              </Button>
                              <input
                                  type="text"
                                  id="article-searcher"
                                  className="searchbox"
                                  placeholder="Search Products/Sellers"
                                  onKeyUp={searchCatalog}
                              />
                              {/**/}
                          </div>          
                  <div>
                      <p></p>
                  </div>
                </Typography>
                  </div>
            </div>

            

        )
}

export default ArchiveNav