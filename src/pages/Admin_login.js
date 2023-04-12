import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactJsAlert from "reactjs-alert";
import Loader from "../components/Loader";

const Admin_Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();
    setLoader(true);
    const { username, password } = formData;
    if (!username || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/admin/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("admin_token", response.data.token);
      setStatus(true);
      setType("success");
      setTitle("Logged in success!");
      setLoader(false);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setStatus(true);
      setType("warning");
      setTitle("Username or Password wrong");
      setLoader(false);
    }
    setError("");
  };

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <ReactJsAlert
          status={status}
          type={type}
          title={title}
          Close={() => setStatus(false)}
        />
        <div className="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Admin
          </h1>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <form className="mt-6" onSubmit={login}>
            <div>
              <label
                HtmlFor="username"
                className="block text-sm text-gray-800"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="username"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 
              focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <div>
                <label
                  HtmlFor="password"
                  className="block text-sm text-gray-800"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 
                focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <a href="#" className="text-xs text-gray-600 hover:underline">
                Forget Password?
              </a>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loader ? <Loader /> : <></>}
    </>
  );
};

export default Admin_Login;
