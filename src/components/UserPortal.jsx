import { useState } from "react";
import { supabase } from "../supabaseclient";

function UserPortal({ user, setPage }) {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // LOGIN / SIGN UP
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // ==============================
    // SIGN UP
    // ==============================

    if (isSignup) {
      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      if (password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        return;
      }

      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      setLoading(false);

      if (error) {
        console.error(error);
        setMessage(error.message);
        return;
      }

      setMessage(
        "Account created! Please check your email to confirm your account.",
      );

      setPassword("");
      setConfirmPassword("");

      return;
    }

    // ==============================
    // LOGIN
    // ==============================

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }

    setMessage("Login successful!");

    setPassword("");

    setTimeout(() => {
      setPage("home");
    }, 800);
  };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      setMessage("Could not log out.");
      return;
    }

    setMessage("Logged out successfully.");
  };

  // ==============================
  // SWITCH LOGIN / SIGN UP
  // ==============================

  const switchMode = () => {
    setIsSignup(!isSignup);

    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setMessage("");

    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // ==============================
  // LOGGED-IN ACCOUNT
  // ==============================

  if (user) {
    return (
      <section className="account-page">
        <div className="account-box">
          <div className="account-icon">♡</div>

          <span>MY ACCOUNT</span>

          <h1>Welcome!</h1>

          <p>You are currently logged in as:</p>

          <strong>{user.email}</strong>

          {message && <div className="auth-message">{message}</div>}

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    );
  }

  // ==============================
  // LOGIN / SIGNUP PAGE
  // ==============================

  return (
    <section className="auth-page">
      <div className="auth-box">
        <span>{isSignup ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</span>

        <h1>{isSignup ? "Create Account" : "Login"}</h1>

        <p>
          {isSignup
            ? "Create an account to save your favorite products."
            : "Login to access your account and wishlist."}
        </p>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}

          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}

          <label htmlFor="password">Password</label>

          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}

          {isSignup && (
            <>
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="password-field">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </>
          )}

          {/* SUBMIT */}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        {/* MESSAGE */}

        {message && <div className="auth-message">{message}</div>}

        {/* SWITCH LOGIN / SIGNUP */}

        <button type="button" className="switch-auth" onClick={switchMode}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </section>
  );
}

export default UserPortal;
