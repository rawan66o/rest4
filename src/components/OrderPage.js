import React from "react";
import OrderTable from "./OrderTable";
import OrderHeader from "./OrdersHeader";
const OrdersPage = () => {
  return (
    <div
      style={{
        padding: "40px",
        background: "#f8f8f8",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      <OrderHeader />
      <OrderTable />
    </div>
  );
};

export default OrdersPage;
