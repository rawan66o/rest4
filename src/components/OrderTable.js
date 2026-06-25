import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // دالة لجلب التوكن من التخزين
  // =========================
  const getToken = () => {
    return (
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
    );
  };

  // =========================
  // دالة لجلب الطلبات
  // =========================
  const fetchOrders = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://menu.teknova-sy.com/api/admin/orders",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // إذا التوكن منتهي
      if (response.status === 401) {
        // امسح التوكن من التخزين
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");

        // حول المستخدم لتسجيل الدخول
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Orders API:", data);
      setOrders(data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // useEffect
  // =========================
  useEffect(() => {
    const token = getToken();

    // إذا ما في توكن، روح لتسجيل الدخول
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchOrders(token);
  }, []);

  // =========================
  // عرض حالة التحميل
  // =========================
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>جاري تحميل الطلبات...</p>
      </div>
    );
  }

  // =========================
  // عرض حالة الخطأ
  // =========================
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        <p>حدث خطأ: {error}</p>
        <button onClick={() => window.location.reload()}>إعادة المحاولة</button>
      </div>
    );
  }

  // =========================
  // عرض الطلبات
  // =========================
  return (
    <div
      style={{
        marginTop: "10px",
        overflowX: "auto",
      }}
    >
      {/* العناوين */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(140px, 1fr))",
          padding: "16px 24px",
          gap: "16px",
          color: "rgb(58, 51, 51)",
          background: "rgb(232, 235, 237)",
          fontWeight: "bold",
          border: "2px solid rgba(102, 102, 102, 0.12)",
          borderRadius: "12px",
          minWidth: "1000px",
        }}
      >
        <span>معلومات الطلب</span>
        <span>اسم العميل ونوعه</span>
        <span>السعر الكلي</span>
        <span>صورة الطلب</span>
        <span>تفاصيل الطلب</span>
        <span>صنف الطلب</span>
        <span>أزرار التحكم</span>
      </div>

      {/* الطلبات */}
      <div
        style={{
          minWidth: "1050px",
        }}
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderRow
              key={order.id}
              order={{
                id: order.id,
                time: order.created_at,
                customer: order.customer_name || "اسم غير موجود",
                customerImage:
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                type: order.customer_address || "زبون",
                price: `${order.total_amount} $`,
                image:
                  order.items?.[0]?.product?.image_url ||
                  "https://via.placeholder.com/50",
                image1:
                  order.items?.[1]?.product?.image_url ||
                  order.items?.[0]?.product?.image_url ||
                  "https://via.placeholder.com/50",
                details:
                  order.items
                    ?.map((item) => `${item.product.name} × ${item.quantity}`)
                    .join(" , ") || "لا يوجد تفاصيل",
                category: order.items?.[0]?.product?.category_id || "بدون صنف",
              }}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>
            لا توجد طلبات لعرضها
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
