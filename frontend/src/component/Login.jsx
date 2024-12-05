import { useEffect, useRef } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const Email = useRef();
  const Password = useRef();

  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (auth) {
      navigate("/");
    }
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const email = Email.current.value;
    const password = Password.current.value;

    const response = await fetch("http://localhost:8001/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const user = await response.json();

    if (user.fullname) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalit username or password");
      navigate("/login");
    }
  };

  return (
    <form className={styles.form} action="/" onSubmit={handleOnSubmit}>
      <h1>Login Page</h1>
      <div className={styles.inputField}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          ref={Email}
        />
      </div>
      <div className={styles.inputField}>
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          placeholder="Password"
          name="password"
          ref={Password}
        />
      </div>
      <div className={styles.btn}>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <button type="reset" className="btn btn-primary">
          Cancel
        </button>
        Don't have an account? <Link to="/signup"> Sign up</Link>
      </div>
    </form>
  );
};

export default Login;
