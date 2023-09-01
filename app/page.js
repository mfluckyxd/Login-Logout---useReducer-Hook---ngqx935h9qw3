'use client'
import React, { useReducer } from "react";

const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  isInvalid: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "LOGIN":
      if (state.username && state.password) {
        return { ...state, isLoggedIn: true, isInvalid: false };
      } else {
        return { ...state, isInvalid: true };
      }
    case "LOGOUT":
      return { ...state, isLoggedIn: false, username: "", password: "" };

    default:
      break;
  }
};

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div id="main">
      {state.isLoggedIn ? (
        <section className="logout-section">
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}!</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </section>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          {state.isInvalid && (
            <p className="invalid-error">Invalid username or password!</p>
          )}
          <section className="username-input">
            <label>Username: </label>
            <input
              type="text"
              placeholder="Username"
              className="username"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
          </section>
          <section className="password-input">
            <label>Password: </label>
            <input
              type="password"
              placeholder="Password"
              className="password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </section>
          <button className="login-btn">Login</button>
        </form>
      )}
    </div>
  );
}

export default Home;
