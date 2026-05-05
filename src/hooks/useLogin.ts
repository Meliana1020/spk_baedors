import { useState } from "react";
import { login } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Berhasil! Selamat bekerja, Bre.");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      alert("Login Gagal: " + (err.response?.data?.message || "Email salah"));
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, loading, handleLogin };
}