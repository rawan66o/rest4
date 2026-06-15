import AdminAvatar from "./AdminAvatar";
import Icon from "./Icon";
import { dashboardImages } from "../../data/dashboardData"; 

function OrderRow({ order }) {
  const images = order.images || [];
  const extraCount = order.extraItemsCount || 0;

  const img1 = images[0] || dashboardImages.meal;
  const img2 = images[1] || dashboardImages.burger;

  return (
  <article
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
      <h4 style={{ margin: 0, fontSize: "16px" }}>
        {order.id}
      </h4>
      <span style={{ color: "#888", fontSize: "14px" }}>
        {order.time}
      </span>
    </div>

    {/* العميل */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <AdminAvatar small />
      <div>
        <h4 style={{ margin: 0 }}>
          {order.customerName}
        </h4>
        <span style={{ color: "#888", fontSize: "14px" }}>
          {order.customerType}
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

    {/* الصور */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <img
        src={img1}
        alt=""
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />

      <img
        src={img2}
        alt=""
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />

      {extraCount > 0 && (
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
          +{extraCount}
        </span>
      )}
    </div>

    {/* التفاصيل */}
    <div>
      <h4
        style={{
          margin: 0,
          marginBottom: "5px",
          fontSize: "14px",
        }}
      >
        {order.dishName}
      </h4>

      <span
        style={{
          color: "#888",
          fontSize: "14px",
        }}
      >
        {order.dishDetails}
      </span>
    </div>

    {/* الصنف */}
    <div>
      <h4
        style={{
          margin: 0,
          marginBottom: "5px",
        }}
      >
        {order.categoryName}
      </h4>

      <span
        style={{
          color: "#888",
          fontSize: "14px",
        }}
      >
        {order.categoryDetails}
      </span>
    </div>

    {/* التحكم */}
    <div
      style={{
        display: "flex",
        gap: "12px",
      }}
    >
      <button
        style={{
          border: "none",
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        <Icon name="eye" size={16} />
      </button>

      <button
        style={{
          border: "none",
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        <Icon name="trash" size={16} />
      </button>
    </div>
  </article>
);
}

export default OrderRow;