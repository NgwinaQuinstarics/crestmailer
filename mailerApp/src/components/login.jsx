import { useState } from "react";
import logo from "../assets/logo1.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in:", form);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src={logo} alt="Crestlancing Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-xl font-semibold text-blue-600 tracking-wide">CRESTLANCING</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange("password")}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Log In
            </button>

            <div className="text-sm text-gray-500 text-center mt-2">
              Forgot your password? <a href="#" className="text-blue-500 hover:underline">Reset</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}