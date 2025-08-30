import { useState } from "react";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginSuccess, logout } from "../store/slices/authSlice";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "At least 6 characters")
    .regex(/[A-Z]/, "Include an uppercase letter")
    .regex(/[a-z]/, "Include a lowercase letter")
    .regex(/[^A-Za-z0-9]/, "Include a special character"),
});

type FormErrors = {
  email: string | null;
  password: string | null;
};

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({
    email: null,
    password: null,
  });

  const handleOnChange = (event: "email" | "password") => {
    setErrors((prev) => ({ ...prev, [event]: null }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ email: null, password: null });

    const emailError = email.trim() ? null : "Email is required";
    const passwordError = password.trim() ? null : "Password is required";

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    const res = schema.safeParse({ email, password });
    if (!res.success) {
      const fieldErrors: FormErrors = { email: null, password: null };
      res.error.issues.forEach((issue) => {
        if (issue.path.includes("email")) {
          fieldErrors.email = issue.message;
        } else if (issue.path.includes("password")) {
          fieldErrors.password = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    dispatch(loginSuccess({ email }));
    setEmail("");
    setPassword("");
  };

  if (user) {
    return (
      <div className="user-info">
        <span className="user-info__email">
          Signed in as <strong>{user.email}</strong>
        </span>
        <button
          onClick={() => dispatch(logout())}
          className="user-info__logout"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <div className="auth-form__field">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            handleOnChange("email");
            setEmail(e.target.value);
          }}
          className={`auth-form__input ${
            errors.email ? "auth-form__input--error" : ""
          }`}
          required
        />
        {errors.email && <div className="auth-form__error">{errors.email}</div>}
      </div>

      <div className="auth-form__field">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            handleOnChange("password");
            setPassword(e.target.value);
          }}
          className={`auth-form__input ${
            errors.password ? "auth-form__input--error" : ""
          }`}
          required
        />
        {errors.password && (
          <div className="auth-form__error">{errors.password}</div>
        )}
      </div>

      <button type="submit" className="auth-form__submit">
        Login / Register
      </button>
    </form>
  );
};

export default AuthForm;
