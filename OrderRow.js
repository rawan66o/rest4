import React from "react";
import { FiEye } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const OrderRow = ({ order }) => {
  return (
    <div
      style={{
        display: "grid",

        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        alignItems: "center",
        background: "#fff",
        padding: "16px 20px",
        gap: "18px",
        marginTop: "10px",
        borderRadius: "16px",
        marginBottom: "15px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      {/* معلومات الطلب */}
      <div>
        <h4
          style={{
            margin: 0,
            fontSize: "16px",
          }}
        >
          {order.id}
        </h4>

        <span
          style={{
            color: "#888",
            fontSize: "14px",
          }}
        >
          {order.time}
        </span>
      </div>

      {/* العميل */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={order.customerImage}
          alt=""
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div>
          <h4
            style={{
              margin: 0,
              fontSize: "15px",
            }}
          >
            {order.customer}
          </h4>

          <span
            style={{
              color: "#888",
              fontSize: "14px",
            }}
          >
            {order.type}
          </span>
        </div>
      </div>

      {/* السعر */}
      <h3
        style={{
          margin: 0,
          color: "#2F2A25",
          fontSize: "22px",
        }}
      >
        {order.price}
      </h3>

      {/* صور الطلب */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={order.image}
          alt=""
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            objectFit: "cover",
            border: "2px solid white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />

        <img
          src={order.image1}
          alt=""
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            objectFit: "cover",
            border: "2px solid white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
        
      </div>

      {/* التفاصيل */}
      <div>
        <h4
          style={{
            margin: 0,
            marginBottom: "5px",
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          {order.details}
        </h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              color: "#888",
              fontSize: "14px",
            }}
          >
            مع سلطة روسية
          </span>

          <span
            style={{
              background: "#FFF7ED",
              color: "#F59E0B",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            +2
          </span>
        </div>
      </div>

      {/* الصنف */}
      <div>
        <h4
          style={{
            margin: 0,
            marginBottom: "5px",
          }}
        >
          الصنف #{order.category}
        </h4><span
          style={{
            color: "#888",
            fontSize: "14px",
          }}
        >
          مع السلطات
        </span>
      </div>

      {/* التحكم */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            border: "none",
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          <FiEye />
        </button>

        <button
          style={{
            border: "none",
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  );
};

export default OrderRow;