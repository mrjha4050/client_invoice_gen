import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "@/components/ui/button";
import { setCurrentPage } from "../features/Navbar/navbarSlice";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage("signup"));
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err: unknown) {
      console.error("Error during registration:", err);
      const errorResponse = err as { response?: { data?: { message?: string } } };
      const message = errorResponse.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl p-6">
        <div className="max-w-md px-8 py-12">
          <h1 className="text-3xl font-bold">Sign up to begin your journey</h1>
          <p className="mt-2 text-gray-400">Join us to explore amazing opportunities.</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Register
              </Button>
            </div>
          </form>
        </div>
        <div className="hidden lg:block">
          <img
            src="http://res.cloudinary.com/dalptk18r/image/upload/v1735332933/zgybhegmtfkrijyb6q7d.png"
            alt="Banner"
            className="rounded-lg shadow-lg max-w-lg h-70 w-70"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;