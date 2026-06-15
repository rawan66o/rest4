import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  // =========================
  // TOKEN
  // =========================
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTliOTQxMi1iYmEwLTcxOWYtOWYxZC05MmE2MjdiOGQ2NDUiLCJqdGkiOiJhOTZjMjQzMTUyZWQxMTJmZjcyMDY0NWFmZjg3YzAyMmI1MTNhMGM4ZDg5MzY3Mjg0MzkyZGU4ODZhOTI1OTk0YmEwZjgxYzE4YzI1ZDdmOCIsImlhdCI6MTc4MTI3MzAwNy4xNjE1MTUsIm5iZiI6MTc4MTI3MzAwNy4xNjE1MTcsImV4cCI6MTc4MTM1OTQwNy4xNDc2MjQsInN1YiI6IjAxOWRmMzhmLWUzYWMtNzFmNS04MWI3LWYwN2VjYmRlNTQ5OCIsInNjb3BlcyI6W119.kvj0_ivn4AcgvzvaCxnWmmIG33FiODwAlj57tNlh3J6N6ZMudxm27mm2nLKwUtnKaDEg_7T4ECI6CmQ3Cfu6C-tOHqf0FjwXGsf58Yk6RkjFLfcjAdh1vguGdtoe4fT2Putux1wdXOmxApbFgeAbaDwVXU-PwBE1wsy1rLx9bRKm04rRVf_H9CENByNSKsK2D0kxTPPR6O4QmAfGZADufFreHN4EfkaS3xuLeV-5svlByxh6kj-b0ypzeUGTp8dB1NJLXN6r5rXNWqUsdebz2Qod8KtreMutf6cDVB185OszMOxCwVoNLVG7-5G0iGDGfrR5JOsTdxbEvS0VaV7HNE5i9ZKKPSkjnpLchU-XoRsB16BqYtoOHq0e6r4GmJDFxdJwzZBMQ_iEGUZfw1q5c1UwI8_TMwGbvBkxi_ElvRdvBpYNEFxaTH_ZkGM79k4O8OM-yElRpuOxryjFK4ZidM2qE6iLgzpwg1QJZxcY0hNo8kThDrZfz8BeBstwRU32mWEdTWRW_AAiaKdZmdsy4M1rpnVtstCiOymn-J8DCxRc-Tq0CNTitCFsZ7yqIAg1nuRu9CMF9qM8QHl4Y4ebhKsmvQoc10Z21tcqEFduHGQKV7s2f7Bb_UIwsBb3gnM0Tj9kIx0P-ciAbWrM50-hU6JzdesXpbbdjXZXbuCpZWw";

  // =========================
  // FETCH ORDERS
  // =========================
  //test
  useEffect(() => {
    fetch("https://menu.teknova-sy.com/api/admin/orders", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${token}`,
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
        ))}
      </div>
    </div>
  );
};

export default OrderTable;
