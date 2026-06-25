import React from "react";
import { FiDownload, FiSliders } from "react-icons/fi";

function OrdersHeader() {
  return (
    <div
      style={{
        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "25px",

        flexWrap: "wrap",

        gap: "15px",
      }}
    >
      {/* اليمين */}
      <div>
        <h2
          style={{
            margin: 0,

            fontSize: "clamp(24px, 4vw, 32px)",

            fontWeight: "700",

            color: "rgba(47, 42, 37, 1)",
          }}
        >
          الطلبات
        </h2>

        <span
          style={{
            color: "#888",

            fontSize: "14px",
          }}
        >
          لديك 24 طلب حالياً
        </span>
      </div>

      {/* اليسار */}
      <div
        style={{
          display: "flex",

          gap: "12px",

          flexWrap: "wrap",
        }}
      >
        {/* زر التحميل */}
        <button
          style={{
            border: "none",

            background: "rgba(255, 255, 255, 1)",

            color: "rgba(47, 42, 37, 1)",

            padding: "16px 22px",

            borderRadius: "20px",

            display: "flex",

            alignItems: "center",

            gap: "8px",

            cursor: "pointer",

            fontSize: "15px",

            fontWeight: "500",

            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",

            transition: "0.3s",
          }}
        >
          <FiDownload size={18} />
          تنزيل الفاتورة
        </button>

        {/* زر الفلترة */}
        <button
          style={{
            border: "1px solid #eee",

            background: "rgba(255, 255, 255, 1)",

            color: "rgba(47, 42, 37, 1)",

            padding: "16px 22px",

            borderRadius: "20px",

            display: "flex",

            alignItems: "center",

            gap: "8px",

            cursor: "pointer",

            fontSize: "15px",

            fontWeight: "500",

            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",

            transition: "0.3s",
          }}
        >
          <FiSliders size={18} />
          فلترة حسب
        </button>
      </div>
    </div>
  );
}

export default OrdersHeader;
