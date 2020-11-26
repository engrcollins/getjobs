import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Collapse } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RouterIcon from '@material-ui/icons/Router';




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
}));

const Side = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          style={{padding:"1px" }}
        >
          <ListItemIcon>
            <HomeIcon style={{fontSize:"20px", padding:"1px"}} />
          </ListItemIcon>
          <Link to={"/e-commerce"}>
            <ListItemText primary= "Home" />
          </Link>
        </ListItem>

        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          style={{padding:"1px" }}
        >
          <ListItemIcon>
            <AccessTimeIcon style={{fontSize:"20px", padding:"1px"}} />
          </ListItemIcon>
          <Link to={"/registration"}>
            <ListItemText primary="Registration"/>
          </Link>
        </ListItem>

        <ListItem
        button
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
        style={{padding:"1px" }}
      >
        <ListItemIcon>
          <AccessTimeIcon style={{fontSize:"20px", padding:"1px"}} />
        </ListItemIcon>
        <Link to={"/login"}>
          <ListItemText primary="Login"/>
        </Link>
      </ListItem>

      <ListItem
        button
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
        style={{padding:"1px" }}
      >
        <ListItemIcon>
          <AccessTimeIcon style={{fontSize:"20px", padding:"1px"}} />
        </ListItemIcon>
        <Link to={"/search-filter"}>
          <ListItemText primary="Search Page"/>
        </Link>
      </ListItem>
      </List>

      <Divider />

      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          style={{padding:"1px" }}
        >
        <ListItemIcon>
          <PeopleIcon style={{fontSize:"20px", padding:"1px"}} />
        </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>

       <ListItem button onClick={handleClick} style={{padding:"1px" }}>
        <ListItemIcon>
          <AccessTimeIcon style={{fontSize:"20px", padding:"1px"}} />
        </ListItemIcon>
        <ListItemText primary="Archives" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} >
            <ListItemIcon>
              <StarBorder style={{fontSize:"20px", padding:"1px"}} />
            </ListItemIcon>
            <ListItemText primary="2019" />
          </ListItem>

            <ListItem button className={classes.nested} >
              <ListItemIcon>
                <StarBorder style={{fontSize:"20px", padding:"1px"}} />
              </ListItemIcon>
              <ListItemText primary="2020" />
            </ListItem>
          </List>
      </Collapse>
    </List>
    </div>
  );
}

export default Side;
