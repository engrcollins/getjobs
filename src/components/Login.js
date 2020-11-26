import React, { useState } from "react";
import './Form.css'
import { BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import { Grid,Typography} from "@material-ui/core";
import Cookies from "js-cookie";
import LoginDataService from "../services/LoginService";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

const useStyles = makeStyles({
    root: {
      width: '100%',
      minWidth: 410,
    },
    table: {
      minWidth: 360,
    },
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    warnings: {
      color: 'red',
      padding: 0,
    },
    success: {
      color: '#004d00',
    },
    
});

const Login= () => {
  const initialUser_loginState = {
    email: "",
    password: ""
  };
  Cookies.remove();
  const [user_login, setUser_login] = useState(initialUser_loginState);
  const [loggedin, setLoggedin] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [errors, setErrors] = useState({});


  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser_login({ ...user_login, [name]: value });
  };
   const toggleShow = event => {
       if (hidden){
           setHidden(false);
       }else{
           setHidden(true)
       };
  };

    const validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateForm = (value) => {
        const errors = {}
        if (!value.email) errors.email = "Email is required";
        else if (!validateEmail(value.email)) errors.email = "Not a valid email address";
        if (!value.password) errors.password = "Password is required";
        return errors
        }

    const history = useHistory();
  const sendUser_login = () => {
    var data = {
        email: user_login.email,
        password: user_login.password
    };
    const errors = validateForm(data)
    setErrors(errors)
    if (!Object.keys(errors).length) {
        LoginDataService.create(data)
        .then(response => {
          setUser_login({
            email: response.data.email,
            password: response.data.id
        });
        Cookies.set('name', user_login.email, { expires: 7 });
        setLoggedin(true);
        console.log(Cookies.get('name'))
        history.push("/")
        window.location.reload(false);
    })
      /*.catch(e => {
        console.log(e);
        window.alert("Invalid credentials, please enter your correct email and password");
        setUser_login(initialUser_loginState);
      });*/

      //Data post confirmation. to be removed later
      setLoggedin(true);
      history.push("/e-commerce")
      window.location.reload(false);
    }
  };

  const classes = useStyles();
  return (
    <div className="library-form">
          <div article-form="true">
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center"><strong>Login</strong>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="email">Email: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="email"
                        required
                        placeholder="Type your email here"
                        value={user_login.email|| ""}
                        onChange={handleInputChange}
                        name="email"
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.email && <p>{errors.email}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>
                    
                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="password">Password: </label></TableCell>
                    <TableCell align="left" ><input
                        type={hidden ? "password" : "text"}
                        className="input-field"
                        id="password"
                        required
                        placeholder="Type your password here"
                        value={user_login.password|| ""}
                        onChange={handleInputChange}
                        name="password"
                    />
                      &ensp;<button onClick={toggleShow}>{hidden ? (<VisibilityOffIcon style={{fontSize:'20px', width: '11px', height: '11px', padding:'-2px'}}/>) : (<VisibilityIcon style={{fontSize:'20px', width: '11px', height: '11px', padding:'-2px'}} />)}
                      </button>
                    <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                          {errors.password && <p>{errors.password}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>

                <button onClick={sendUser_login} className="btn btn-success">
                 Login
                </button>
                <br/>
            </TableContainer>
          </div>
      </div>
  );
};

export default Login;
