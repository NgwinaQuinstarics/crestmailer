import { useState } from "react";
import logo from "../assets/logo1.png";

export default function RegisterForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    
    <div className="min-h-screen bg-white-100 flex items-center justify-center px-6">

      <div className="w-full max-w-3xl">

        {/* form Card */}
        <div className="bg-white  shadow-md border border-gray-100 p-10">
             {/* Logo */}
            <div className="flex items-center justify-center gap-00.45 mb-2">
          <img
            src={logo}
            alt="Crestlancing Logo"
            className="w-18 h-24 object-contain"
          />
          <h1 className="text-xl font-bold text-blue-500 tracking-wide">
            CRESTLANCING
          </h1>
        </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Neba Eric"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="kenzo@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="672678675"
                value={form.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Submit 
            </button>

          </form>

        </div>

      </div>
    </div> 
  );
}