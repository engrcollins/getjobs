import React, { useState } from "react";
import './Form.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Grid,Typography } from "@material-ui/core";
import Reg_formDataService from "../services/Reg_formService";
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
    warnings: {
      color: 'red',
      padding: 0,
    },
    success: {
      color: '#004d00',
    },
    
  });

const Registration= () => {
  const initialReg_formState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    state: "",
    country: "",
    phone: "",
    bio: "",
    password: "",
    confirmPassword: "",
    createdAt: ""
  };
  const [reg_form, setReg_form] = useState(initialReg_formState);
  const [submitted, setSubmitted] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [errors, setErrors] = useState({});
  //const [submit_error, setSubmit_error] = useState("");


  const handleInputChange = event => {
    const { name, value } = event.target;
    setReg_form({ ...reg_form, [name]: value });
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
        if (!value.first_name) errors.first_name = "First name is required";
        if (!value.last_name) errors.last_name = "Last name is required";
        if (!value.gender) errors.gender = "Please select your gender";
        if (!value.date_of_birth) errors.date_of_birth = "Please input your Date of Birth";
        if (!value.state) errors.state = "State is required";
        if (!value.country) errors.country = "Country is required";
        if (!value.bio) errors.bio = "Bio is required";
        if (!value.phone) errors.phone = "Phone number is required";
        if (!value.email) errors.email = "Email address is required";
        else if (!validateEmail(value.email)) errors.email = "Not a valid email address";
        if (!value.password) errors.password = "Password is required";
        else if (value.password === value.state) errors.password = "Please provide a password different from your state";
        else if (!value.confirmPassword) errors.confirmPassword = "Please repeat the password";
        else if (value.password !== value.confirmPassword) errors.confirmPassword = "Passwords don't match";

        return errors
        }

  const saveReg_form = () => {
    var data = {
      first_name: reg_form.first_name,
      last_name: reg_form.last_name,
      gender: reg_form.gender,
      date_of_birth: reg_form.date_of_birth.toLocaleString(),
      state: reg_form.state,
      country: reg_form.country,
      bio: reg_form.bio,
      phone: reg_form.phone,
      email: reg_form.email,
      password: reg_form.password,
      confirmPassword: reg_form.confirmPassword,
      createdAt: new Date().toLocaleString(),
    };
    const errors = validateForm(data)
    setErrors(errors)
    if (!Object.keys(errors).length) {
      Reg_formDataService.create(data)
      .then(response => {
        console.log(reg_form.state)
        console.log(response.data)
        if ((reg_form.state === response.data) && (typeof response.data === 'string')){
            console.log(reg_form.state)
            console.log(response.data)
            window.alert(`Your state ${reg_form.state} exists already, please try another state`);
            setReg_form(initialReg_formState);
        }else if ((reg_form.email === response.data) && (typeof response.data === 'string')){
            console.log(reg_form.email)
            console.log(response.data)
            window.alert(`Your email ${reg_form.email} exists already, please try another email`);
            setReg_form(initialReg_formState);
        }else{
            setReg_form({
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              gender: response.data.gender,
              date_of_birth: response.data.date_of_birth,
              state: response.data.state,
              phone: response.data.phone,
              email: response.data.email,
              password: response.data.password,
              createdAt: response.data.createdAt
            });
            setSubmitted(true); // to be removed when backend is connected
            //console.log(response.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
      setSubmitted(true);
    }
  };

  const classes = useStyles();
  return (
    <div className="library-form">
      <div className="submit-form">
        {submitted ? (
          <div>
            <br />
            <Typography variant="body1" display="block" className={classes.success} gutterBottom>
              <CheckCircleTwoToneIcon style={{fontSize:'26px', padding:'-2px'}}/>
              Registration successful!
              <br />
              <Link to={"/"}><b>Continue</b></Link> to site or <Link to={"/login"}><b>login</b></Link> to site
            </Typography>
          </div>
        ) : (
          <div article-form="true">
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center"><strong>Registration Form</strong>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="first_name">First Name: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="first_name"
                        required
                        placeholder="Type your first name here"
                        value={reg_form.first_name}
                        onChange={handleInputChange}
                        name="first_name"
                    />
                        <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                          {errors.first_name && <p>{errors.first_name}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="last_name">Last Name: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="last_name"
                        required
                        placeholder="Type your last name here"
                        value={reg_form.last_name}
                        onChange={handleInputChange}
                        name="last_name"
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.last_name && <p>{errors.last_name}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="email">e-mail: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="email"
                        required
                        placeholder="Input your email address"
                        value={reg_form.email|| ""}
                        onChange={handleInputChange}
                        name="email"
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.email && <p>{errors.email}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="gender">Gender: </label></TableCell>
                    <TableCell align="left"><select id="gender" required value={reg_form.gender || ""}
                        onChange={handleInputChange} name="gender">
                        <option value="" disabled selected hidden>Please choose your gender...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Undisclosed">Prefer not to Disclose</option>           
                      </select>
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.gender && <p>{errors.gender}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="date_of_birth">Date of Birth: </label></TableCell>
                    <TableCell align="left"><TextField
                        id="date_of_birth"
                        label="Birthday"
                        type="date"
                        defaultValue="2000-01-24"
                        value={reg_form.date_of_birth}
                        onChange={handleInputChange}
                        name="date_of_birth"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.date_of_birth && <p>{errors.date_of_birth}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="state">State: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="state"
                        required
                        placeholder="Provide your state"
                        value={reg_form.state|| ""}
                        onChange={handleInputChange}
                        name="state"
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.state && <p>{errors.state}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="country">Country: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="country"
                        required
                        placeholder="Provide your country"
                        value={reg_form.country|| ""}
                        onChange={handleInputChange}
                        name="country"
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.state && <p>{errors.state}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="bio">Bio: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="bio"
                        required
                        placeholder="Provide your bio"
                        value={reg_form.bio|| ""}
                        onChange={handleInputChange}
                        name="bio"
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.bio && <p>{errors.bio}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>
                    
                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="phone">Phone: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="phone"
                        required
                        placeholder="Input your business phone number"
                        value={reg_form.phone|| ""}
                        onChange={handleInputChange}
                        name="phone"
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                          {errors.phone && <p>{errors.phone}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="password">Password: </label></TableCell>
                    <TableCell align="left"><input
                        type={hidden ? "password" : "text"}
                        className="input-field"
                        id="password"
                        required
                        placeholder="Pick a password(min of 8 characters)"
                        value={reg_form.password|| ""}
                        onChange={handleInputChange}
                        name="password"
                    />
                      <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                        {errors.password && <p>{errors.password}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="confirmPassword">Confirm Password: </label></TableCell>
                    <TableCell align="left" ><input
                        type={hidden ? "password" : "text"}
                        className="input-field"
                        id="confirmPassword"
                        required
                        placeholder="Retype your password here"
                        value={reg_form.confirmPassword|| ""}
                        onChange={handleInputChange}
                        name="confirmPassword"
                    />
                      &ensp;<button onClick={toggleShow}>{hidden ? (<VisibilityOffIcon style={{fontSize:'20px', width: '11px', height: '11px', padding:'-2px'}}/>) : (<VisibilityIcon style={{fontSize:'20px', width: '11px', height: '11px', padding:'-2px'}} />)}
                      </button>
                    <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                          </Typography>
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>

                <button onClick={saveReg_form} className="btn btn-success">
                Submit
                </button>
                <br/>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
