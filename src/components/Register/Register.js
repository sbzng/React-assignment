import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const nav = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) nav("/");
  }, [user, loading]);
  return (
    <div className="register">
      <Card sx={{ maxWidth: 345 }}>
        <Typography gutterBottom variant="h5" component="div" className="cardTitle">
          TMDB Client
        </Typography>
        <form className="form">
          <TextField type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            variant="standard" />
          <br />
          <TextField type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            variant="standard" />
          <br />
          <TextField type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            variant="standard" />
          <br />
          <Button className="register__btn" onClick={register} variant="outlined">Register</Button>
          <br />
          <Button className="register__btn register__google"
            onClick={signInWithGoogle} variant="outlined">Register with Google</Button>
          <br />
          <Typography variant="p" color="text.secondary">
            Already have an account? <Link to="/login">Login</Link> now.
          </Typography>
        </form>
      </Card>
    </div>
  );
}
export default Register;