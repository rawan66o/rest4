import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  // =========================
  // TOKEN
  // =========================
   const token =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTliOTQxMi1iYmEwLTcxOWYtOWYxZC05MmE2MjdiOGQ2NDUiLCJqdGkiOiJmNjdjOWIxYjEwZTIzMzM0ZDJiZjk0NWJlMTc4Mzk0YWM4NTkyM2I4YTIxNTZlOTY2MTM1YTY2YzE5NTM1MGRhNGZiYWExOGRkNjk0ZjAzNiIsImlhdCI6MTc4MTcwODk2NS44MDc1NjMsIm5iZiI6MTc4MTcwODk2NS44MDc1NjUsImV4cCI6MTc4MTc5NTM2NS43OTYyNTMsInN1YiI6IjAxOWRmMzhmLWUzYWMtNzFmNS04MWI3LWYwN2VjYmRlNTQ5OCIsInNjb3BlcyI6W119.ZczWo4rHL-PxWx8TVvnLVk_pXRUU6ICvDcY84FVkMBSxZrnsy06wGS_iKcLTCLfvuJbWAcF3fEZoki469cBU2vzFnRtAR3x7sSq4EIRplwZdHvcXxskUWVKw30yTCHPJ0vaEUsHy4r3ZvJ07l6YB2vfNKebsRKBNDaLZTOiCZ1MLO0_R5pSsoZJAzhYRFrmeG7xFjT0Xs3QnjasBB12tj2TzbdMJo5-0suOw0xSN7vv_AARnrekMKmT_T1mR64MDhKTYNuDgAgIQmL8ecGKTW3obYv7Jv4UnlXcVaCYKio1UzQ2gxWcuw4F5RMsh91Y6u3uTADMPLdLUYDaxq6PnPYWvHKEyGbn5mcaxXozf0xfYlJeLub0VsBh0X6rmUGj95KoPTTJGn7nBTdGCNQmuyOeGTWuS2fKaBRvce2Xs6gwyr8b_4jV33Lqk2pr77_SASEfX0lIj5OJLDoLfg2i9-J3DgQla7hg5Y8GSh5FSJQpn6C3EYGkS1ov4oiVdxFqkO-m8psLyIjFfzSaaeg1pBxGchJeiO5JaA5xeQvDWdarxGZaJ4hn-n6S5vvTSmrAkqWOE_H-Zf66kIXPb2_eilGP3Twpq1zp00wmGmFXkyFwtmTwT62rUb7YzD_KpBBKKlFC77KD6-OvEhtnsFDBChAbNBtJNjSO7KBEwej_v9ZA";
  // =========================
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
      .catch((err) => console.log(err));
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