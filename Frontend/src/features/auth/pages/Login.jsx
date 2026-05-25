import { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user, loading, handleLogin } = useAuth();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(username, password).then(() => {
      console.log("user logged in");
      navigate("/");
    });
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <button className="button primary-button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account?
          <Link to="/register">Create One.</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
