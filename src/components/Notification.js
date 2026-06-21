import React, { useEffect, useState } from "react";
import api from "../api";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { TbPin } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(true);

  const getNotifications = async () => {
    try {
      const res = await api.get("/notifications/unread");
      setNotifications(res.data.data);
      console.log(res.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  const makeRead = () => {
    // console.log("clicked");

    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return (
    <div className="notification mt-5">
      <div className="container d-flex justify-content-between">
        <div className="elem">
          <button className="btn" onClick={() => setVisible(false)}>
            <BsFillTrash3Fill className="me-2" />
            حذف الكل
          </button>
          <button onClick={() => makeRead()} className="btn">
            <IoCheckmarkDoneSharp className="me-2" /> تحديد الكل كمقروء
          </button>
        </div>
        <div className="elem">
          <h4>الإشعارات</h4>
        </div>
      </div>

      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3 mt-5"
        justify
      >
        <Tab eventKey="home" title="النظام">
          Tab content for Home
        </Tab>
        <Tab eventKey="profile" title="الطلبات">
          <div>
            {visible &&
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="order-card"
                  style={{
                    backgroundColor: n.is_read
                      ? "rgb(194, 243, 210)"
                      : "rgb(247, 248, 209)",
                  }}
                >
                  <div className=" d-flex justify-content-center align-items-center">
                    <BsThreeDotsVertical className="order-icon" />
                    <TbPin className="order-icon" />
                  </div>
                  <p className="mt-2 order-date">{n.created_at}</p>
                  <p className="mt-2 order-message">{n.message}</p>
                  <h4 className="order-id"> {n.id} طلب جديد</h4>
                  <SlBasket className="basket-icon" />
                  <div></div>
                </div>
              ))}
          </div>
        </Tab>
        <Tab eventKey="longer-tab" title="الكباتن">
          Tab content for Loooonger Tab
        </Tab>
        <Tab eventKey="contact" title="جميع الإشعارات">
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
};

export default Notification;
