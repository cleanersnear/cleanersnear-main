"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    additional_info: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Unexpected server response. Please try again later.");
      }
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/book/user/login"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #e5e7eb" }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: "#1a2b3b", textAlign: "center" }}>Create Your Account</h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Personal Information */}
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "#1a2b3b" }}>Personal Information</h3>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <input
              name="first_name"
              type="text"
              placeholder="First Name*"
              value={form.first_name}
              onChange={handleChange}
              required
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email Address*"
            value={form.email}
            onChange={handleChange}
            required
            style={{ ...inputStyle, marginBottom: 16 }}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={{ ...inputStyle, marginBottom: 16 }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password* (minimum 6 characters)"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            style={inputStyle}
          />
        </div>

        {/* Address Information */}
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "#1a2b3b" }}>Address (Optional)</h3>
          <input
            name="street"
            type="text"
            placeholder="Street Address"
            value={form.street}
            onChange={handleChange}
            style={{ ...inputStyle, marginBottom: 16 }}
          />
          <input
            name="suburb"
            type="text"
            placeholder="Suburb"
            value={form.suburb}
            onChange={handleChange}
            style={{ ...inputStyle, marginBottom: 16 }}
          />
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <input
              name="state"
              type="text"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              name="postcode"
              type="text"
              placeholder="Postcode"
              value={form.postcode}
              onChange={handleChange}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
          <textarea
            name="additional_info"
            placeholder="Additional Information (e.g., unit number, special instructions)"
            value={form.additional_info}
            onChange={handleChange}
            rows={3}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          />
        </div>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        
        {error && <div style={{ color: "#b91c1c", marginTop: 8, fontSize: 14 }}>{error}</div>}
        {success && <div style={{ color: "#059669", marginTop: 8, fontSize: 14 }}>{success}</div>}
      </form>
      
      <div style={{ marginTop: 16, fontSize: 14, color: "#4b5563", textAlign: "center" }}>
        Already have an account?{" "}
        <a href="/book/user/login" style={{ color: "#1E3D8F", textDecoration: "none", fontWeight: 500 }}>
          Log in
        </a>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  fontSize: 16,
  marginBottom: 0,
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  borderRadius: 8,
  border: "none",
  background: "#1E3D8F",
  color: "#fff",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 8,
  transition: "background-color 0.2s",
};

export default RegisterPage;
