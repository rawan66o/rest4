import { React, useState, useEffect } from "react";
import Personal from "../assets/personal_pic.png";
import { TbUser } from "react-icons/tb";
import { TbUserScan } from "react-icons/tb";
import { TbPhoneCall } from "react-icons/tb";
import { PiMapPinArea } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { PiPasswordBold } from "react-icons/pi";
import "./account.css";
import api from "../api";

const Account = () => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setId(userId);

      getUser(userId);
    }
  },  []);

  const getUser = async (userId) => {
    try {
      const res = await api.get(`/admin/users/${userId}`);
      console.log(res.data);
      console.log(localStorage.getItem("userId"));
      setId(res.data.data.id);
      setUsername(res.data.data.name);
      setName(res.data.data.name);
      setEmail(res.data.data.email);
      setAddress(res.data.data.address);
      setPhone(res.data.data.phone);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const updateUser = async () => {
    console.log(id);

    const adminToken = localStorage.getItem("adminToken");
    console.log(localStorage.getItem("adminToken"));
    console.log(localStorage.getItem("token"));
    console.log(adminToken);
    console.log("ID:", id);
    console.log("Email:", email);
    try {
     if (
        email === "admin@gmail.com" ||
        email === "admin@admin.com" ||
        id === "019df38f-e3ac-71f5-81b7-f07ecbde5498"
      ) {
        return alert("لا يمكنك تعديل حساب الأدمن");
      }
      const res = await api.put(
        `/admin/update/user/${id}`,
        {
          name,
          email,
          phone,
          address,
         }
        ,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );
      console.log(res.data.data);
      console.log(res.data);

      alert("تم التحديث بنجاح");
    } catch (err) {
      console.log(err.response?.data);
            alert("حدث خطأ أثناء التحديث");
    }
  };
  const deleteUser = async () => {
    console.log(localStorage.getItem("adminToken"));

    try {
      if (
        email === "admin@gmail.com" ||
        email === "admin@admin.com" ||
        id === "019df38f-e3ac-71f5-81b7-f07ecbde5498"
      ) {
        return alert("عذراً، لا يمكنك حذف حساب الأدمن الرئيسي من الواجهة!");
      }
      if (!id) return alert("لم يتم العثور على معرف المستخدم");
      const confirmDelete = window.confirm(
        "هل أنت متأكد من حذف الحساب نهائياً؟",
      );
      if (!confirmDelete) return;
      const res = await api.delete(`/admin/delete/user/${id}`);
      console.log(res.data);
      alert("تم حذف المستخدم بنجاح");
    } catch (err) {
      console.log("Error deleting user:", err.response?.data);
      console.log(err.response.data);
      alert("حدث خطأ أثناء محاولة الحذف");
    }
  };

  return (
    <div className="account">
      <div className="container mt-5 p-5 bg-body-tertiary ">
        <div>
          <h3>معلومات حسابك</h3>
          <h5 className="text-secondary mt-4">هذه معلومات أساسية عن حسابك</h5>
          <div className="d-flex justify-content-end mt-5 align-items-center">
            <div>
              <button className="btn personal-btn" onClick={deleteUser}>
                حذف
              </button>
              <button className="btn personal-btn" onClick={updateUser}>
                تحديث
              </button>
            </div>
            <img className="personal-pic" src={Personal} alt="" />{" "}
          </div>
          <div className="row mt-1">
            <div className="col-6">
              <div className="account-item mt-5">
                <h5>
                  اسم الحساب <TbUserScan size={23} />
                </h5>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="account-item mt-5">
                <h5>
                  البريد الإلكتروني <HiOutlineMail size={23} />
                </h5>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="account-item mt-5 ">
                <h5>
                  الاسم الكامل <TbUser size={23} />
                </h5>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="account-item mt-5 ">
                <h5>
                  رقم الهاتف <TbPhoneCall size={23} />
                </h5>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="account-item mt-5">
              <h5>
                العنوان <PiMapPinArea size={23} />
              </h5>
              <textarea
                type="text"
                className="address-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <button className="btn re-password mt-5">
            إعادة تعيين كلمة المرور <PiPasswordBold />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
