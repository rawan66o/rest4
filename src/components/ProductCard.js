import React from "react";

import { FaShoppingCart } from "react-icons/fa";

import { BiMessageSquareDetail } from "react-icons/bi";

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: "8px",
        width: "200px",
        padding: "4px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      }}
    >
      {/* ========================= */}
      {/* IMAGE */}
      {/* ========================= */}

      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "130px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* ========================= */}
      {/* CATEGORY */}
      {/* ========================= */}

      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(255, 255, 255, 0.2)",
           color: "#fff",
          padding: "4px ",
          borderRadius: "8px",
          fontSize: "15px",
          border: "1px solid rgba(249, 250, 251, 1) ",
        }}
      >
        {product.category}
      </span>

      {/* ========================= */}
      {/* CONTENT */}
      {/* ========================= */}

      <div
        style={{
          padding: "12px 6px 6px",
        }}
      >
        {/* NAME */}

        <h3
          style={{
            fontSize: "15px",

            margin: "0 0 10px",

            color: "#2F2A25",

            fontWeight: "600",

            lineHeight: "1.5",
          }}
        >
          {product.name}
        </h3>

        {/* PRICE */}

        <p
          style={{
            color: "rgba(54, 56, 66, 1)",

            fontWeight: "bold",

            fontSize: "18px",

            margin: "0 0 10px",
          }}
        >
          {product.price || "250 رس"}
        </p>

        {/* ========================= */}
        {/* RATING */}
        {/* ========================= */}

        <div
          style={{
            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            marginBottom: "14px",
          }}
        >
          {/* STARS */}

          <span
            style={{
              color: "#F59E0B",

              fontSize: "14px",
            }}
          >
            ★★★★★
          </span>

          {/* COMMENTS */}

          <span
            style={{
              display: "flex",

              alignItems: "center",

              gap: "4px",

              fontSize: "13px",

              color: "rgba(94, 111, 122, 1)",
            }}
          >
            <BiMessageSquareDetail
              style={{
                fontSize: "15px",
              }}
            />

            97
          </span>
        </div>

        {/* ========================= */}
        {/* BUTTONS */}
        {/* ========================= */}

        <div
          style={{
            display: "flex",

            gap: "8px",

            flexWrap: "wrap",
          }}
        >
          {/* DETAILS BUTTON */}

          <button
            style={{
              flex: 1,

              minWidth: "100px",

              fontSize: "15px",

              padding: "10px",

              borderRadius: "12px",

              border: "1px solid #E5E7EB",

              background: "#F9FAFB",

              cursor: "pointer",

              transition: "0.3s",
            }}
          >
            عرض التفاصيل
          </button>

          {/* CART BUTTON */}

          <button
            style={{
              flex: 1,

              minWidth: "100px",

              fontSize: "15px",

              padding: "10px",

              borderRadius: "12px",

              background: "#f5f5f5",

             color: "rgba(47, 42, 37, 1)",

              border: "none",

              display: "flex",alignItems: "center",

              justifyContent: "center",

              gap: "6px",

              cursor: "pointer",

              transition: "0.3s",
            }}
          >
            أضف للسلة

            <FaShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;