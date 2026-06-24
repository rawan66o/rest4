import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  // =========================
  // TOKEN
  // =========================
   const token =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTliOTQxMi1iYmEwLTcxOWYtOWYxZC05MmE2MjdiOGQ2NDUiLCJqdGkiOiI0ZWFkMDE2NThjNmUzZmJmY2NmYmMyZjYzMzZkYzcwZjAyZWNhZGM1NzUxYzJhZGJhOTNjNDU0NzU4MGYyODk5ZmEwZjdhZTQxMzM4ODlkNiIsImlhdCI6MTc4MjE5Mjc5My4xNjgwNzgsIm5iZiI6MTc4MjE5Mjc5My4xNjgwOCwiZXhwIjoxNzgyMjc5MTkzLjE1NTg2OSwic3ViIjoiMDE5ZGYzOGYtZTNhYy03MWY1LTgxYjctZjA3ZWNiZGU1NDk4Iiwic2NvcGVzIjpbXX0.SZBp2CpChlttLWI8keKuB6jBDmosiOYi-j7zbRqCL0LUmi6OgIyhFBtvge4uzHd13FQdDQG7iQM85glLu0sQTZwsEPF_bSX8cIIZ3HC2JB8sjZ3mUER6cK9a1Eb_55md7r0wpEr6FREdhBQmQhEpxPSyhZmYdA4ANI1w_s4cWP-eUPyJd3F12kLoSFWZTjs89E5_Kk3bW07XA9-iI5ynY680XQjEXcpx2JXJuG2jIa6ZscBCwgNFqtb4G6m_upkoO5q-gRom3obSKXa-J65nHs1Lq6K1ssvBvSaNvWvmJxVdNoyOgf5J2ZUk0RlRQPx_l3QkeODo3OJ9Y0GSAeeSA6iHUY5k8jFmU5U6zCv3Tu7tUByZsqF88KN0STk2ko_LfT7SzkBQTJcddJxZWMXiAnDjINL9XJKNPdTpXLHbOw3-euBbiqLAyyAfVHpcew67mugZwnLxrjvxQnxkCKj69yXP2ymb5atshgLXVVsgnJ8zphsnuzhSt6uUm71FM74SE9kzhCjHexTcWEnB6nShYznPeCa96SspD1InbK8i_K0ZB_n7ZkEQdUdRLJB_u1cRwYf_YeqvfxrMX6Bpui8JGVY1RNPBcVPQjnb8h6hFOwFmN_CQKn8aiBMWZHduAvytYMsT5ViUc9JF0-C-CHqnvbRsAGW6TZjI5ENv7jCITWE"
  // FETCH ORDERS
  // =========================
  useEffect(() => {
    fetch("https://menu.teknova-sy.com/api/admin/orders", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:` Bearer ${token}`,
      },
      
    })
    
      .then((res) => res.json())
      .then((data) => {
        console.log("Orders API:", data);

        setOrders(data.data || []);
      })
      .catch((err) => console.log(err) );
  }, []);
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
      <h1>عدد الطلبات: {orders.length}</h1>
      <div
        style={{
          minWidth: "1050px",
        }}
      >
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={{
              id: order.id,

              time: order.created_at,

              customer:
                order.customer_name || "اسم غير موجود",

              customerImage:
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",

              type:
                order.customer_address || "زبون",

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
                  ?.map(
                    (item) =>
                      `${item.product.name} × ${item.quantity}`
                  )
                  .join(" , ") || "لا يوجد تفاصيل",

              category:
                order.items?.[0]?.product?.category_id ||
                "بدون صنف",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderTable;