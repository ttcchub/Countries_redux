import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("no name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);


  return <div>
    <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
    <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
    <input type="text" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
    <Button onClick={register}>Register</Button>
    <div>
        Already have an account?
        <Link to="/login">Login</Link>
    </div>
  </div>;
};

export default Register;
