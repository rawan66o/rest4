import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import cover from "../assets/cover.png";
import logo from "../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate()
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const userId = res.data.data.user.id;
console.log(res.data.data.user.role)
      localStorage.setItem("token", res.data.data.access_token);
      localStorage.setItem("userId", res.data.data.user.id);
      console.log("Saved userId", localStorage.getItem("userId"));
      console.log(JSON.stringify(res.data, null, 2));
      console.log(res.data);
      const userName = res.data.data.user.name.toLowerCase();
      if (
        userId === "019df38f-e3ac-71f5-81b7-f07ecbde5498" ||
        userName === "admin" ||
        email === "admin@admin.com"
      ) {
        localStorage.setItem("adminToken", res.data.data.access_token);
        alert("Welcome Admin");
        navigate("/")
        localStorage.setItem("token", res.data.data.access_token);
        console.log(localStorage.getItem("adminToken"));
      } else {
        alert("Welcome User");
        localStorage.setItem("token", res.data.data.access_token);
        console.log(localStorage.getItem("token"));
      }
    } catch (err) {
      alert("Error email or password");
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);
    }
  };

  return (
    <div className="login row d-flex justify-content-center align-items-center">
      <div className="cover col-6">
        <img src={cover} alt="cover-img" className="cover-img" />
      </div>
      <div className="welcome col-6 mt-3">
        <form className="login-box w-76 mx-auto" onSubmit={login}>
          <img className="login-logo" src={logo} alt="" />
          <h1>أهلاً بعودتك</h1>
          <h3 className="login-item">ادخل اسمك او البريد الالكتروني</h3>
          <input
            type="email"
            placeholder="أدخل الايميل"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="login-item">ادخل كلمة المرور</h3>
          <div className="password-box">
            <input
              className="password-input"
              type="password"
              placeholder="أدخل كلمة المرور "
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaEye className="eyeIcon" />
          </div>
          <h6 className="forget">هل نسيت كلمة المرور؟</h6>
          <div className="roow d-flex justify-content-center align-items-center mt-1 w-100">
            <hr />
            <h5 className="text-secondary min-title">المتابعة باستخدام</h5>
            <hr />
          </div>
          <div className="social-media d-flex justify-content-around align-items-center">
            <FcGoogle className="icon" size={22} />
            <h5>Sign in with Google</h5>
            <FaFacebook className="icon facebook" size={22} />
            <FaApple className="icon apple" />
          </div>
          <h5 className="create-account">
            ليس لديك حساب؟<span>إنشاء حساب </span>
          </h5>
          <button type="submit" className="login-btn">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
