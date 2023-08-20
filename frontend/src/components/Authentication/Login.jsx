import React, { useState, useContext } from "react";
import { Box, Typography, TextField, CssBaseline,  Button, Card, CardContent, Grid, Link,CircularProgress} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import styles from "./Auth.module.css";

const Login = () => {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const [load, setLoad] = useState(false); // for loading spinner
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // To Handle the State of the Input Fields (Username and Password) 
  const onChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };
  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

 // when we submit the form, we want to send the data to the server 
  const onSubmit = async (e) => {

    e.preventDefault();
    setLoad(true);
    const newUser = { username, password };
    const url = "/api/auth/login";

    const loginRes = await Axios.post(url, newUser);

    if (loginRes.data.status === "fail") {
      setLoad(false);
      setUsernameError(loginRes.data.message);
      setPasswordError(loginRes.data.message);
    } else {

      setUserData(loginRes.data); // from the usercontext
      // set the token to local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
      //you are instructing the router to navigate to the root URL of your application. This can be useful in scenarios where you want to redirect the user to a different page programmatically, such as after a successful form submission or a user action.
      // it does not render "/" componet but if an "/" component's state is changed, it will re-render
    }
  };

  return (
    <div className={styles.background}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Box width="70vh" boxShadow={1}>
          <Card className={styles.paper}>
            <CardContent>
              <Typography component="h1" variant="h5"> Login </Typography>
              <form className={styles.form} onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  error={usernameError.length > 0 ? true : false}
                  helperText={usernameError}
                  value={username}
                  onChange={onChangeUsername}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={passwordError.length > 0}
                  helperText={passwordError}
                  value={password}
                  onChange={onChangePassword}
                />
                <Box display="flex" justifyContent="center">
                  {!load ? (<Button type="submit" variant="contained" color="primary" className={styles.submit}>
                    Login
                  </Button>) : (<CircularProgress />)}
                </Box>

              </form>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/register" variant="body2"> Need an account? </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </div>
  );
};

export default Login;
