//2:36 youtube name pedro tech reactjs full course 2026
//What a hook is in react?
//here usestate,usenavigate,usecontext are hook, a hook is a function in react that lets you use state lifecycle logic and react features inside of it and they can return some information so its kind of like in-between normal function and a component because what it does is if wanted to create a function like normal function that isnot a state like get, you cannot call a hook inside a function but with hooks you can , only call hooks at top level of component
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const { signUp, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);
    let result;
    if (mode === "signup") {
    result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                id="email"
                {...register("email", { required: "Email is required."})}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                id="password" 
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters.",
                  }
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
           { mode === "signup" ? (
            <p>
              Already have an account? 
              <span className="auth-link" onClick={() => setMode("login")} >Login</span>
            </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}