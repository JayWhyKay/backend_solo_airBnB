import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(

      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      }
    ).then(()=> history.push('/'));
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({
        credential: "demo@demo.na",
        password: "password",
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data) setErrors(Object.values(data.errors));
    }).then(()=> history.push('/'));
  };

  return (
    <form onSubmit={handleSubmit} className="form_body">
      <span>Login</span>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
      <button onClick={handleDemo}>DemoUser</button>
    </form>
  );
}

export default LoginForm;
