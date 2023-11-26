import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { auth, sendPasswordResetEmail } from "../../firebase";
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="reset">
      <Card sx={{ maxWidth: 345 }}>
        <Typography gutterBottom variant="h5" component="div" className="cardTitle">
          TMDB Client
        </Typography>
        <form className="form">
          <TextField type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address" />
          <br />
          <Button  className="reset__btn" variant="outlined"
          onClick={() => sendPasswordResetEmail(email)}> Send password reset email</Button>
          <br />
          <Typography variant="p" color="text.secondary">
          Don't have an account? <Link to="/register">Register</Link> now.
          </Typography>
        </form>
      </Card>
    </div>
  );
}
export default Reset;