import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          password2: form.password2
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        if (errData?.email) {
          console.log(errData)
          setError("Email already exists");
        } else {
          setError("Registration failed. Please try again.");
        }
        return;
      }

      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const isFormValid = [
    form.username,
    form.email,
    form.password,
    form.password2,
  ].every((field) => (field || "").trim() !== "");

  return (
    <div className="register-page">
      <h2>Regisztráció</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Felhasználónév"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Jelszó"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password2"
          placeholder="Jelszó újra"
          value={form.password2}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={!isFormValid}>
          Regisztráció
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
