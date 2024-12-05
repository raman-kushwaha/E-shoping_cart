import { useEffect, useRef } from "react";
import styles from "./SignupPage.module.css";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const Username = useRef();
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
    const username = Username.current.value;
    const email = Email.current.value;
    const password = Password.current.value;

    const res = await fetch("http://localhost:8001/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };
  return (
    <form className={styles.form} action="/" onSubmit={handleOnSubmit}>
      <h1>Sign Up Page</h1>
      <div className={styles.inputField}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          name="username"
          ref={Username}
        />
      </div>
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
          SignUp
        </button>
        <button type="reset" className="btn btn-primary">
          Cancel
        </button>
        Have account? <Link to="/login"> Login</Link>
      </div>
    </form>
  );
};

export default SignupPage;
