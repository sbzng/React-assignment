import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {

      return;
    }
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <div className="login">
      <Card sx={{ maxWidth: 345 }}>
        <Typography gutterBottom variant="h5" component="div" className="cardTitle">
          TMDB Client
        </Typography>
        <form className="form">
          <TextField type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address" id="standard-basic" label="Email address" variant="standard" />
          <br />
          <TextField type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" id="standard-basic" label="Password" variant="standard" />
          <br />
          <Button className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)} variant="outlined">Login</Button>
          <br />
          <Button className="login__btn login__google" onClick={signInWithGoogle} variant="outlined">Login with Google</Button>
          <br />
          <Typography variant="p" color="text.secondary" className="forgotPassword">
            <Link to="/reset">Forgot Password</Link>
          </Typography>
          <br />
          <Typography variant="p" color="text.secondary">
            Don't have an account? <Link to="/register">Register</Link> now.
          </Typography>
        </form>
      </Card>
    </div>
  );
}
export default Login;